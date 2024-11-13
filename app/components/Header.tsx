import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminHeader({user}: {user:any}) {

    const logout = async() => {
        "use server";
        cookies().delete("token");
        redirect("/login");
    }

    return(
        <header>
            <div className="lg:flex lg:items-center lg:justify-between py-4 px-2 my-8">
                <div className="min-w-0 flex-1">
                    <h2 className="font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                        Welcome back, Admin {user.name}
                    </h2>
                </div>
                <div className="mt-5 flex lg:ml-4 lg:mt-0">
                    <span className="hidden sm:block">
                    <form action={logout}>
                        <button className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                            </svg>
                            &nbsp;
                            Logout
                        </button>
                    </form>
                    </span>
                </div>
            </div>
        </header>
    )
}