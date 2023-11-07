export const Login = () => {
    return (
        <div className="h-screen w-screen grid grid-cols-2 grid-rows-1 font-body">
            <div className="">
                <img className="h-full w-full" src="/assets/LoginPage-BG.png" alt="Login BG" />
            </div>
            <div className="h-full w-full flex justify-center items-center">
                <form className="w-3/6 h-3/6 border-2 rounded-3xl shadow-2xl flex flex-col justify-center">
                   <div className="flex flex-col space-y-2 mb-6 px-8">
                        <label className="text-lg">
                            Usuário
                        </label>
                        <input className="rounded-lg border p-2 hover:border-gray-600 "
                        type="text" 
                        placeholder={"Digite seu usuário"}
                        />
                   </div>
                   <div className="flex flex-col space-y-2 mb-12 px-8">
                        <label className="text-lg">
                            Senha
                        </label>
                        <input className="rounded-lg border p-2 hover:border-gray-600 "
                        type="password"
                        placeholder={"Digite sua senha"}
                        />
                    </div>
                    <div className="flex align-center justify-center">
                        <button className="text-lg text-white bg-purple-highlight px-6 py-2 rounded-lg  hover:text-amber hover:scale-105 transition ease-in-out duration-200">
                            Entrar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}