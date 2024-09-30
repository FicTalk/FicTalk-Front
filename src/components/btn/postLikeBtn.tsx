import { useLikePost } from "@/hooks/usePost";
import { PiHeartFill } from "react-icons/pi";
import { toast } from "sonner";

export default function PostLikeBtn() {
	const { trigger, isMutating } = useLikePost();
	const onClick = async () => {
		return trigger().then(() => toast.success("좋아요 등록이 되었습니다", { duration: 1500 }));
	};
	return (
		<button disabled={isMutating} onClick={onClick} className="w-fit">
			<PiHeartFill className="text-black/30" />
		</button>
	);
}
