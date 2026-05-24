// app/admin/photo/page.tsx
"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Trash, Upload, X, ImageIcon, Loader2 } from 'lucide-react';
import { storage, ID } from '@/lib/appwrite';
import AdminNavBar from '../components/AdminNavBar';

interface AppwriteImage {
    $id: string;
    name: string;
    url: string;
}

export default function AdminPhotoPage() {
    const [images, setImages] = useState<AppwriteImage[]>([]);
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(true); // Add loading state
    const [error, setError] = useState<string>('');
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const bucketId = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!;

    // ✅ Wrap fetchImages in useCallback to prevent recreation
    const fetchImages = useCallback(async () => {
        try {
            const response = await storage.listFiles(bucketId);
            const imageList = await Promise.all(
                response.files.map(async (file) => {
                    const url = storage.getFileView(bucketId, file.$id);
                    return {
                        $id: file.$id,
                        name: file.name,
                        url,
                    };
                })
            );
            setImages(imageList);
        } catch (err) {
            console.error('Failed to fetch images:', err);
            setError('Could not load images');
        } finally {
            setLoading(false);
        }
    }, [bucketId]); // Add dependency

    // ✅ Safe effect - only runs once on mount
    useEffect(() => {
        fetchImages();
    }, [fetchImages]); // Now depends on stable fetchImages

    const validateFile = (file: File): boolean => {
        const acceptedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        const maxSizeMB = 5;

        if (!acceptedTypes.includes(file.type)) {
            setError(`Unsupported file type. Allowed: ${acceptedTypes.join(', ')}`);
            return false;
        }
        if (file.size > maxSizeMB * 1024 * 1024) {
            setError(`File too large. Max ${maxSizeMB}MB`);
            return false;
        }
        return true;
    };

    const uploadFiles = async (files: FileList | File[]) => {
        setError('');
        const fileArray = Array.from(files);
        const validFiles = fileArray.filter(validateFile);

        if (validFiles.length === 0) return;

        setUploading(true);
        const uploadedImages: AppwriteImage[] = [];

        for (const file of validFiles) {
            try {
                const response = await storage.createFile(bucketId, ID.unique(), file);
                const url = storage.getFileView(bucketId, response.$id);
                uploadedImages.push({
                    $id: response.$id,
                    name: response.name,
                    url,
                });
            } catch (err) {
                console.error(`Failed to upload ${file.name}:`, err);
                setError(`Failed to upload ${file.name}`);
            }
        }

        setImages((prev) => [...prev, ...uploadedImages]);
        setUploading(false);

        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) uploadFiles(e.target.files);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files) uploadFiles(e.dataTransfer.files);
    };

    const removeImage = async (index: number) => {
        const imageToDelete = images[index];
        try {
            await storage.deleteFile(bucketId, imageToDelete.$id);
            setImages((prev) => prev.filter((_, i) => i !== index));
        } catch (err) {
            console.error('Delete failed:', err);
            setError('Failed to delete image');
        }
    };

    const clearAllImages = async () => {
        setError('');
        for (const img of images) {
            try {
                await storage.deleteFile(bucketId, img.$id);
            } catch (err) {
                console.error(`Failed to delete ${img.name}:`, err);
            }
        }
        setImages([]);
    };

    const triggerFileInput = () => {
        if (!uploading) fileInputRef.current?.click();
    };

    // Show loading state while fetching images
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
            </div>
        );
    }

    return (
        <div className="max-w-[1920px] w-full mx-auto">
            <AdminNavBar />
            <div className='mt-20 lg:px-12 md:px-6 px-4'>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 md:p-8">
                        {/* Header */}
                        <div className="mb-6">
                            <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                                <ImageIcon className="w-5 h-5 text-gray-500" />
                                Image Gallery
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">
                                Upload up to 5 images • Max 5MB each
                            </p>
                        </div>

                        {/* Upload Area */}
                        <div
                            onClick={triggerFileInput}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            className={`
              relative cursor-pointer transition-all duration-200
              border-2 border-dashed rounded-xl p-8
              flex flex-col items-center justify-center gap-3
              ${uploading ? 'opacity-60 cursor-not-allowed' : ''}
              ${isDragging
                                    ? 'border-blue-400 bg-blue-50/50 scale-[0.99]'
                                    : 'border-gray-200 bg-gray-50/30 hover:bg-gray-50/60'
                                }
            `}
                        >
                            <input
                                ref={fileInputRef}
                                type="file"
                                multiple
                                accept="image/jpeg,image/png,image/gif,image/webp"
                                onChange={handleUpload}
                                disabled={uploading}
                                className="hidden"
                            />

                            <div className={`
              w-14 h-14 rounded-full flex items-center justify-center
              ${isDragging ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}
            `}>
                                {uploading ? (
                                    <Loader2 className="w-6 h-6 animate-spin" />
                                ) : (
                                    <Upload className="w-6 h-6" />
                                )}
                            </div>

                            <div className="text-center">
                                <p className="text-gray-700 font-medium">
                                    {uploading
                                        ? 'Uploading...'
                                        : isDragging
                                            ? 'Drop your images here'
                                            : 'Drag & drop images here'
                                    }
                                </p>
                                <p className="text-sm text-gray-400 mt-1">
                                    or click to browse from your device
                                </p>
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="mt-4 p-3 bg-red-50 rounded-xl border border-red-100 flex items-center gap-2 text-red-600 text-sm">
                                <X className="w-4 h-4 shrink-0" />
                                {error}
                            </div>
                        )}

                        {/* Images Grid */}
                        <div className="mt-8">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-gray-700">Uploaded Images</span>
                                    {images.length > 0 && (
                                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                                            {images.length} / 5
                                        </span>
                                    )}
                                </div>

                                {images.length > 0 && !uploading && (
                                    <button
                                        type="button"
                                        onClick={clearAllImages}
                                        className="text-xs text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1"
                                    >
                                        <X className="w-3 h-3" />
                                        Clear all
                                    </button>
                                )}
                            </div>

                            {images.length === 0 ? (
                                <div className="bg-gray-50/50 rounded-xl border border-gray-100 p-8 text-center">
                                    <ImageIcon className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                                    <p className="text-gray-400 text-sm">No images uploaded yet</p>
                                    <p className="text-gray-300 text-xs mt-1">Your uploaded images will appear here</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-2.5">
                                    {images.map((image, index) => (
                                        <div
                                            key={image.$id}
                                            className="group relative aspect-square rounded-xl overflow-hidden bg-gray-100 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200"
                                        >
                                            <img
                                                src={image.url}
                                                alt={image.name}
                                                className="w-full h-full object-cover"
                                            />

                                            {/* Overlay & delete button */}
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        removeImage(index);
                                                    }}
                                                    disabled={uploading}
                                                    className="bg-white/90 hover:bg-red-500 text-gray-700 hover:text-white p-2 rounded-full transition-all duration-200 transform scale-90 group-hover:scale-100"
                                                >
                                                    <Trash className="w-4 h-4" />
                                                </button>
                                            </div>

                                            {/* File name tooltip */}
                                            <div className="flex absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm p-1.5 translate-y-full group-hover:translate-y-0 transition-transform duration-200">
                                                <p className='text-white text-xs truncate px-1'>{index}</p>
                                                <p className="text-white text-xs truncate px-1">
                                                    {image.name}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}