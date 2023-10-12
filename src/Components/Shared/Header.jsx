import { useStepsContext } from "../../Context/StateContext";

const Header = () => {
  const { openLoginModal, setOpenLoginModal } = useStepsContext();

  return (
    <div className="bg-black">
      <div className="flex justify-between items-center  py-5 w-[90%] mx-auto ">
        {/* Left */}
        <div className="flex justify-between gap-20 items-center">
          <div className="flex justify-center items-center gap-3">
            <img
              src="/assets/logo.png"
              alt="logo"
              className="w-[60px] object-cover"
            />
            <div>
              <h1 className="text-[#fff] text-[13px] leading-4 mb-[1px] font-semibold">
                Greenwashing <br /> Identifier
              </h1>
              <p className="text-[#dfdddd] text-[11px]">By ImpactScope</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center gap-10">
          <img
            src="./assets/profile.png"
            alt="logo"
            className="cursor-pointer"
            onClick={() => setOpenLoginModal(!openLoginModal)}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
