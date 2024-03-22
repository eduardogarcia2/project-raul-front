const SimpleModal = ({ isOpen, onClose, children }: { isOpen: any, onClose: any, children: any }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-[#1f2937] p-5 rounded-lg">
                <button onClick={onClose} className="float-right font-bold text-white">X</button>
                {children}
            </div>
        </div>
    );
};

export default SimpleModal;
