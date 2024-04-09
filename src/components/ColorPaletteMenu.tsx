import CloseIcon from '@mui/icons-material/Close';

function ColorPaletteMenu({ onColorSelect, onClose }: any) {
    const colors = ['#ffc9c9', '#b2f2bb', '#ffec99', '#a5d8ff', '#fff', '#d0bfff'];

    return (
        <div className="absolute top-0 left-60 w-full mt-20 mr-10 bg-white shadow-lg rounded-lg p-4 flex flex-col justify-center items-center">
            <h3 className="text-lg font-semibold mb-2">Paleta de Colores</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 absolute top-2 right-2">
                <CloseIcon />
            </button>
            <div className="grid grid-cols-2 gap-3">
                {colors.map((color, index) => (
                    <button
                        key={index}
                        className={`w-10 h-10 rounded-full border border-black`}
                        style={{ background: color }}
                        onClick={() => onColorSelect(color)}
                    />
                ))}
            </div>
        </div>
    );
}

export default ColorPaletteMenu
