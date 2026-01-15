type TProp = {
    width: number;
    height: number;
    darkWidth: number;
    darkHeight: number;
}

export const Logo = ({width, height, darkWidth, darkHeight}: TProp) => {
    return (
        <div>
            <img
                className="dark:hidden"
                src="/aplicativo/icon-512x512.png"
                alt="Logo"
                width={width}
                height={height}
                />

            <img
                className="hidden dark:block"
                src="/aplicativo/logo.png"
                alt="Logo"
                width={darkWidth}
                height={darkHeight}
                />
        </div>
    )
}