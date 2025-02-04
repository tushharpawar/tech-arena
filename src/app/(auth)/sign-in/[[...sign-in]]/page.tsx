import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function Page (){
    return (
        <>
        <div className="h-screen w-screen flex items-center justify-center">
        <SignIn appearance={{baseTheme:dark}}/>
        </div>
        </>
    )
    
}