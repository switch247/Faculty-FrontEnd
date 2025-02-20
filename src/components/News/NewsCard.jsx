import Link from 'next/link';
import Image from 'next/image';

export default function NewsCard({ news }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        <Image
          src={news.image || '/default-news.jpg'}
          alt={news.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 text-gray-900">{news.title}</h3>
        <p className="text-gray-600 line-clamp-3 mb-4">{news.content}</p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>By {news.author?.name || 'Admin'}</span>
          <span>{new Date(news.createdAt).toLocaleDateString()}</span>
        </div>
        <Link 
          href={`/news/${news.id}`}
          className="mt-4 inline-block text-blue-600 hover:underline"
        >
          Read more →
        </Link>
      </div>
    </div>
  );
}