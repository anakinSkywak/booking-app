import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client"
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

const SignOutButton = () => {
    const { showToast } = useAppContext();
    const navigator = useNavigate();
    const queryClient = useQueryClient();

    const mutation = useMutation(apiClient.signOut, {
        onSuccess: async () => {
            await queryClient.invalidateQueries("validateToken")
            showToast({message: "đăng xuất thành công", type: "SUCCESS"});
            navigator("/dangnhap")
        },
        onError: (error: Error) => {
            showToast({message: error.message, type: "ERROR"})
        }
    });

    const handleClick = () => {
        mutation.mutate(); 
    }

    return (
        <button
        onClick={handleClick}
         className="flex items-center bg-white rounded-md text-blue-600 px-3 font-bold hover:bg-gray-100 hover:text-green-500">
         Đăng xuất
        </button>
    )
}

export default SignOutButton;