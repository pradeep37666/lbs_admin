import parser from "html-react-parser";
import { useAtom } from "jotai";
import Image from "next/image";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { Blog } from "../services/blog";
import { snackAtom } from "../stores/atoms";
import getImage from "../utils/getImage";
import ItemPlaceholder from "../assets/images/item-placeholder.png";

type Props = {
	values: Blog;
	isModal?: boolean;
	resetTicket: () => void;
};
function BlogOverview({ isModal, resetTicket, values }: Props) {

	const getItemImage = (imageKey: string | undefined) => {
		if (imageKey) return getImage(imageKey);
		else return ItemPlaceholder.src;
	};

	return (
		<div
			className={`${isModal ? "w-full" : "max-w-[64%]"
				} bg-white border-[1px] border-grey-border rounded-xl flex-grow h-full overflow-auto hide-scroll p-4 flex flex-col`}
		>
			<div className="blog-content-div overflow-y-auto">
				<div className="relative">
					{/* <Image
						src={getItemImage(values.image)}
						width={1200}
						height={800}
						className="object-cover h-100 w-100"
						alt=""
					/> */}
					<img
						src={getItemImage(values.image)}
						className="object-contain h-[800px] w-full"
						alt=""
					/>
					<h2 className="absolute text-white drop-shadow-lg text-6xl bottom-8">{values.bannerTitle}</h2>
				</div>
				<div className="pt-10 content-set">
					<h3 className="text-3xl text-black font-bold text-center">{values.contentTitle}</h3>
					{parser(values.contentBody)}
				</div>
			</div>
		</div>
	);
}

export default BlogOverview;
