export default function Form() {
    return (
        <div className="w-full xl:px-12 px-6 lg:mt-16 mt-12 flex flex-col lg:gap-6 gap-2 relative text-[#212121]">
            <h1 className="text-[32px] font-semibold">Apply For Credit</h1>
            <div className="flex flex-col gap-6 bg-white px-8 py-6 rounded-xl">
                <div className="flex flex-col gap-1">
                    <h1 className="text-[24px] font-semibold capitalize">Get approved from home!</h1>
                    <p className="text-[16px] font-medium ">Please fill out the secure credit application below.</p>
                </div>
                <form className="flex flex-col gap-6">
                    <div className="flex flex-col gap-4">
                        <h1 className="lg:text-[20px] text-[18px] font-semibold uppercase">Personal Information</h1>
                        <div className="grid grid-cols-2 gap-6">
                            {/* first name  */}
                            <div className="group flex flex-col gap-1.5">
                                <label className="capitalize text-[18px] font-medium center items-start! justify-start! gap-1">
                                    <span>first name </span>
                                    <span className="text-[rgba(240,11,31,1)] text-[20px] font-bold">*</span></label>
                                <input
                                    required
                                    type="text"
                                    placeholder="EX: Mushfiqur"
                                    className="w-full p-4 shadow-[0px_0px_0px_1px_rgba(33,33,33,.15)] rounded-lg border-none outline-none text-[18px]"
                                />
                            </div>

                            {/* last name  */}
                            <div className="group flex flex-col gap-1.5">
                                <label className="capitalize text-[18px] font-medium center items-start! justify-start! gap-1">
                                    <span>last name </span>
                                    <span className="text-[rgba(240,11,31,1)] text-[20px] font-bold">*</span></label>
                                <input
                                    required
                                    type="text"
                                    placeholder="EX: Rahman"
                                    className="w-full p-4 shadow-[0px_0px_0px_1px_rgba(33,33,33,.15)] rounded-lg border-none outline-none text-[18px]"
                                />
                            </div>

                            {/* phone  */}
                            <div className="group flex flex-col gap-1.5">
                                <label className="capitalize text-[18px] font-medium center start! justify-start! gap-1">
                                    <span>phone </span>
                                    <span className="text-[rgba(240,11,31,1)] text-[20px] font-bold">*</span></label>
                                <input
                                    required
                                    type="text"
                                    placeholder="EX: 015......"
                                    className="w-full p-4 shadow-[0px_0px_0px_1px_rgba(33,33,33,.15)] rounded-lg border-none outline-none text-[18px]"
                                />
                            </div>

                            {/* email */}
                            <div className="group flex flex-col gap-1.5">
                                <label className="capitalize text-[18px] font-medium center items-start! justify-start! gap-1">
                                    <span>email </span>
                                    <span className="text-[rgba(240,11,31,1)] text-[20px] font-bold">*</span></label>
                                <input
                                    required
                                    type="email"
                                    placeholder="EX: xyz@gmail.com"
                                    className="w-full p-4 shadow-[0px_0px_0px_1px_rgba(33,33,33,.15)] rounded-lg border-none outline-none text-[18px]"
                                />
                            </div>

                            {/* Material Status  */}
                            <div className="group flex flex-col gap-1.5">
                                <label className="capitalize text-[18px] font-medium center items-start! justify-start! gap-1">
                                    <span>Material Status </span>
                                    <span className="text-[rgba(240,11,31,1)] text-[20px] font-bold">*</span></label>
                                <select className="capitalize w-full p-4 shadow-[0px_0px_0px_1px_rgba(33,33,33,.15)] rounded-lg border-none outline-none text-[18px]" name="" id="">
                                    <option value="maried">maried</option>
                                    <option value="unmaried">unmaried</option>
                                </select>
                            </div>

                            {/* birth of date */}
                            <div className="group flex flex-col gap-1">
                                <label className="capitalize text-[18px] font-medium center items-start! justify-start! gap-1">
                                    <span>birth of date </span>
                                    <span className="text-[rgba(240,11,31,1)] text-[20px] font-bold">*</span></label>
                                <input
                                    required
                                    type="date"
                                    placeholder="EX: xyz@gmail.com"
                                    className="w-full p-4 shadow-[0px_0px_0px_1px_rgba(33,33,33,.15)] rounded-lg border-none outline-none text-[18px]"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h1 className="lg:text-[20px] text-[18px] font-semibold uppercase">Current Residence</h1>

                        <div className="grid grid-cols-2 gap-6">
                            {/* address  */}
                            <div className="group flex flex-col gap-1.5">
                                <label className="capitalize text-[18px] font-medium center items-start! justify-start! gap-1">
                                    <span>address </span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="EX: Address"
                                    className="w-full p-4 shadow-[0px_0px_0px_1px_rgba(33,33,33,.15)] rounded-lg border-none outline-none text-[18px]"
                                />
                            </div>

                            {/* city  */}
                            <div className="group flex flex-col gap-1.5">
                                <label className="capitalize text-[18px] font-medium center items-start! justify-start! gap-1">
                                    <span>city </span>
                                    {/* <span className="text-[rgba(240,11,31,1)] text-[20px] font-bold">*</span> */}
                                </label>
                                <input
                                    type="text"
                                    placeholder="EX: Rahman"
                                    className="w-full p-4 shadow-[0px_0px_0px_1px_rgba(33,33,33,.15)] rounded-lg border-none outline-none text-[18px]"
                                />
                            </div>

                            {/* Province */}
                            <div className="group flex flex-col gap-1.5">
                                <label className="capitalize text-[18px] font-medium center start! justify-start! gap-1">
                                    <span>Province </span>
                                    {/* <span className="text-[rgba(240,11,31,1)] text-[20px] font-bold">*</span> */}
                                </label>
                                <input
                                    type="text"
                                    placeholder="EX: 015......"
                                    className="w-full p-4 shadow-[0px_0px_0px_1px_rgba(33,33,33,.15)] rounded-lg border-none outline-none text-[18px]"
                                />
                            </div>

                            {/* post code */}
                            <div className="group flex flex-col gap-1.5">
                                <label className="capitalize text-[18px] font-medium center items-start! justify-start! gap-1">
                                    <span>post code </span>
                                    {/* <span className="text-[rgba(240,11,31,1)] text-[20px] font-bold">*</span> */}
                                </label>
                                <input
                                    type="email"
                                    placeholder="EX: xyz@gmail.com"
                                    className="w-full p-4 shadow-[0px_0px_0px_1px_rgba(33,33,33,.15)] rounded-lg border-none outline-none text-[18px]"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="center">
                        
                    </div>
                </form>
            </div>
        </div>
    )
}
