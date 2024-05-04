import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client"
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

export type RegisterFormData = {
    firstname: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string,
}
  
const Register = () => {
    const navigate = useNavigate();
    const { showToast } = useAppContext();
    const queryClient = useQueryClient();

    const { 
        register , 
        watch , 
        handleSubmit, 
        formState: {errors} 
    } = useForm<RegisterFormData>();


    const mutation = useMutation(apiClient.register, {
        onSuccess: async () => {
            showToast({message: "bạn đã đăng ký thành công", type:"SUCCESS"});
            await queryClient.invalidateQueries("validateToken");
            navigate("/");
        },
        onError: (err: Error) => {
            showToast({message: err.message, type:"ERROR"});
           
        }
    })

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data)
        
    })

    return (
        <form action="" className=" flex flex-col gap-5" onSubmit={onSubmit}>
            <h2 className=" text-3xl font-bold">Hãy điền form để tạo tài khoản</h2>
            <div className="flex flex-col md:flex-row gap-5">
                <label htmlFor="" className="text-gray-700 text-sm font-bold flex-1">
                    First Name:
                    <input type="text" className=" border rounded w-full py-1 px-2 font-normal" {...register("firstname", {required: "Không bỏ trống thông tin"})} />
                    {errors.firstname && (
                        <span className=" text-red-500">{errors.firstname.message}</span>
                    )}
                </label>
                <label htmlFor="" className="text-gray-700 text-sm font-bold flex-1">
                    Last Name:
                    <input type="text" className=" border rounded w-full py-1 px-2 font-normal" {...register("lastName", {required: "Không bỏ trống thông tin"})}/>
                    {errors.lastName && (
                        <span className=" text-red-500">{errors.lastName.message}</span>
                    )}
                </label>
            </div>

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
            <div className="flex flex-col md:flex-row gap-5">
                <label htmlFor="" className="text-gray-700 text-sm font-bold flex-1">
                    Confirm Password:
                    <input type="password" className=" border rounded w-full py-1 px-2 font-normal" {...register("confirmPassword",
                     {
                        required: "Không bỏ trống thông tin",
                         validate: (val) => {
                            if(!val){
                                return "Không bỏ trống thông tin";
                            }
                            else if(watch("password") !== val){
                                return "Password của bạn không trùng khớp";
                            }
                         }
                     })} />
                {errors.confirmPassword && (
                        <span className=" text-red-500">{errors.confirmPassword.message}</span>
                    )}
                </label>
            </div>
            
            <span>
                <button type="submit" className=" bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl rounded-xl">Đăng ký</button>
            </span>
        </form>
    );
}

export default Register;