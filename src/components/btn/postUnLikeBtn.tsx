import { useUnLikePost } from "@/hooks/usePost";
import { PiHeartFill } from "react-icons/pi";
import { toast } from "sonner";

export default function PostUnLikeBtn() {
	const { trigger, isMutating } = useUnLikePost();
	const onClick = async () => {
		return trigger().then(() => toast.success("좋아요가 해제되었습니다", { duration: 1500 }));
	};
	return (
		<button disabled={isMutating} onClick={onClick} className="w-fit">
			<PiHeartFill className="text-red-500" />
		</button>
	);
}
