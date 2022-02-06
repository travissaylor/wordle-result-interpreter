export default function Modal({ isOpen, children }) {
    return (
        <div className="w-full h-full">
            <div
                id="modal-bg"
                className={"w-full h-full bg-[#848A97] top-0 absolute" + isOpen ? "" : " hidden"}
            ></div>
            <div
                id="modal-box"
                className="sm:w-[385px] sm:min-w-[40vw] min-w-[80vw] min-h-[50vh] flex flex-col items-center gap-2 -translate-y-1/2 p-6 bg-[#FFFFEB] rounded-lg top-1/2 left-1/2 -translate-x-1/2 absolute hidden"
            >
                {children}
            </div>
        </div>
    )
}
