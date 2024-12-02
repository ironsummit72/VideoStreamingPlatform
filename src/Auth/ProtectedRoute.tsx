import AxiosInstance from "@/axios/AxiosInstance";
import { login, logout } from "@/redux/Slices/AuthSlice";
import { RootState } from "@/redux/store";
import { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function ProtectedRouter({ children }: { children: ReactNode }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    AxiosInstance.get("/user/currentuser")
      .then((res) => {
        dispatch(login(res.data.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(logout());
        navigate("/login", { replace: true });
      });
  }, []);
  if (auth.isUserAuthenticated) {
    return children;
  } else {
    navigate("/login", { replace: true });
  }
}

export default ProtectedRouter;