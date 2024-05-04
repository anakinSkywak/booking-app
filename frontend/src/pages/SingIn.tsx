import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client"
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

export type SignInFormData = {
    email: string,
    password: string
}


const SingIn = () => {
    const navigator = useNavigate();
    const { showToast } = useAppContext();
    const queryClient = useQueryClient();

    const {
         register,
         handleSubmit,
         formState:{errors}
         } = useForm<SignInFormData>(); 

    const mutation = useMutation(apiClient.SignIn, {
        onSuccess: async () => {
            // thành công hiện thông báo và chuyển hướng đến trang chủ
            showToast({message: "Bạn đã đăng nhập thành công", type: "SUCCESS"});
            await queryClient.invalidateQueries("validateToken");
            navigator('/')
        },
        onError: async (error: Error) => {
            showToast({message: error.message, type: "ERROR"})
        }
    });

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data)
    })

    return(
        <form action="" className=" flex flex-col gap-5" onSubmit={onSubmit}>
            <h2 className=" text-3xl font-bold">Đăng Nhập</h2>

            <div className="flex flex-col md:flex-row gap-5">
                <label htmlFor="" className="text-gray-700 text-sm font-bold flex-1">
                    Email:
                    <input type="email" className=" border rounded w-full py-1 px-2 font-normal" {...register("email", {required: "Không bỏ trống thông tin"})} />
                    {errors.email && (
                        <span className=" text-red-500">{errors.email.message}</span>
                    )}
                </label>
            </div>
            <div className="flex flex-col md:flex-row gap-5">
                <label htmlFor="" className="text-gray-700 text-sm font-bold flex-1">
                    Password:
                    <input type="password" className=" border rounded w-full py-1 px-2 font-normal" {...register("password",
                     {
                        required: "Không bỏ trống thông tin",
                         minLength: {
                            value: 6,
                            message: "password phải có ít nhất 6 ký tự"
                         }
                     })} />
                {errors.password && (
                        <span className=" text-red-500">{errors.password.message}</span>
                    )}
                </label>
            </div>

            <span className="flex justify-between">
                <span className=" text-sm">
                    Bạn chưa có tài khoản <Link className=" underline" to={"/dangky"}>Tạo tài khoản ở đây</Link>
                </span>
                <button type="submit" className=" bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl rounded-xl">Đăng Nhập</button>
            </span>
        </form>
    )
}

export default SingIn;