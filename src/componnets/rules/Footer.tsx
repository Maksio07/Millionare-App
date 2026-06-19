export default function Footer() {
    const year:number = new Date().getFullYear()

    return <footer className="h-12 bg-(--mainBg) w-full">
        <div className="wrapper flex items-center justify-center h-full">
            <p className="text-center text-white text-2xl">&copy;{year} | Zespół gry "Milionerzy"</p>
        </div>
    </footer>
}