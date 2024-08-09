import { converttime } from "../utils/converttime";
import { useCopyToClipboard } from "../utils/copyToClipBoard";
import { AlertMessage } from "./AlertMessage";
import { ModalPopup } from "./SinglePost";

export default function SingleVideo({ rounded = "", userTarget }) {
  const date = converttime(userTarget.createdAt);
  const { isCopied, copyToClipboard } = useCopyToClipboard();
  return (
    <>
      <ModalPopup>
        <div className={`flex flex-col shadow-trick overflow-hidden ${rounded} w-full`}>
          {/* <div className="bg-neutral-300 h-1/2 bg-[url(https://picsum.photos/200)] bg-cover bg-center"></div> */}
          <div className="bg-slate-600 min-h-[300px] flex items-center">
            {/* <!-- <iframe class="w-full aspect-video" src="./../asset/video/demo.mp4"></iframe> --> */}
            <video controls muted className="w-full">
              <source src={userTarget.media} type="video/mp4" />
            </video>
          </div>

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
                <button className="px-2 bg-primary-dark text-white mt-5" onClick={()=>copyToClipboard(window.location.href)}>Share</button>
              </div>
            </div>
          </div>
        </div>
      </ModalPopup>
    </>
  );
}
