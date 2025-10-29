// src/components/NewsItem.tsx
import Image from 'next/image';

interface NewsItemProps {
  title: string;
  date: string;
  imageUrl: string; // URL de l'image (placeholder)
  link: string;
}

const NewsItem = ({ title, date, imageUrl, link }: NewsItemProps) => {
  return (
    <a href={link} className="flex items-center space-x-4 group">
      <div className="flex-shrink-0 w-16 h-16 relative rounded-md overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          sizes="64px"
        />
      </div>
      <div>
        <h4 className="text-sm font-semibold text-white group-hover:text-red-400 transition-colors line-clamp-2">
          {title}
        </h4>
        <p className="text-xs text-gray-400 mt-1">{date}</p>
      </div>
    </a>
  );
};

export default NewsItem;