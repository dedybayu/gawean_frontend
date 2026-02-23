// import { useNavigate } from "react-router-dom";

export default function Home() {
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault(); // Mencegah reload

//     // nanti di sini bisa tambahkan API login ke backend Golang

//     navigate("/dashboard");
//   };

  return (
    <main className="min-h-screen bg-base-200 flex items-center justify-center px-4 bg-gradient-to-br from-primary/20 to-secondary/20">
      <div className="card w-full max-w-lg bg-base-100 shadow-xl">
        <div className="card-body">

          {/* HEADER */}
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold">
              Mlebu Akun
            </h2>
            <p className="text-base-content/70 mt-2">
              Sugeng rawuh maneh 👋
            </p>
          </div>

          {/* FORM */}
          <form className="space-y-4">

            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email@contoh.com"
                className="input input-bordered w-full"
              />
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="input input-bordered w-full"
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Lupa password?
                </a>
              </label>
            </div>

            {/* Button */}
            <button type="submit" className="btn btn-primary w-full mt-4">
              Masuk
            </button>

          </form>

          {/* Divider */}
          <div className="divider">atau</div>

          {/* Social Login */}
          <div className="space-y-3">
            <button className="btn btn-outline w-full">
              Mlebu gawe Google
            </button>
            <button className="btn btn-outline w-full">
              Mlebu gawe GitHub
            </button>
          </div>

          {/* Register */}
          <p className="text-center text-sm text-base-content/70 mt-6">
            Gung duwe akun?{" "}
            <a href="#" className="link link-primary">
              Daftar saiki
            </a>
          </p>

        </div>
      </div>
    </main>
  )
}
