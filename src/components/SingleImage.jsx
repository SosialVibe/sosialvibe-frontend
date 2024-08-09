import { converttime } from "../utils/converttime";
import { useCopyToClipboard } from "../utils/copyToClipBoard";
import { AlertMessage } from "./AlertMessage";
import { ModalPopup } from "./SinglePost";

export default function SingleImage({ rounded = "", userTarget }) {
  const date = converttime(userTarget.createdAt);
  const { isCopied, copyToClipboard } = useCopyToClipboard();
  return (
    <>
      <ModalPopup>
        <div className={`flex flex-col shadow-trick overflow-hidden ${rounded} w-full`}>
          <div style={{ backgroundImage: `url(${userTarget.media})` }} className="bg-neutral-300 h-[364px] bg-cover bg-center"></div>

          <div className="p-6 bg-secondary min-h-1/2 relative">
            {isCopied && (
              <AlertMessage type={true} style="bg-yellow-200 text-yellow-700">
                Copied to clipboard
              </AlertMessage>
            )}
            <div className="p-4 bg-white text-xs font-[275]">
              <small className="text-xs font-extralight">{date}</small>
              <h1 className="text-xl font-semibold mb-1">{userTarget.title}</h1>
              <p>{userTarget.body}</p>
              <div className="flex justify-end">
                <button className="px-2 bg-primary-dark text-white mt-5" onClick={()=>copyToClipboard(window.location.href)}>
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </ModalPopup>
    </>
  );
}
