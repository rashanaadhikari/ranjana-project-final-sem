import Image from 'next/image';

const points = [
    { title: "Set your budget", desc: "Decide how much rent you can afford, including extra costs." },
    { title: "Choose a good location", desc: "Pick a place near work, college, and basic facilities." },
    { title: "List your needs", desc: "Know what you want (rooms, parking, furnished, etc.)." },
    { title: "Visit multiple houses", desc: "Compare different options before deciding." },
    { title: "Check the property", desc: "Make sure water, electricity, and rooms are in condition." },
    { title: "Ask important questions", desc: "Understand rent, rules, and maintenance clearly." },
    { title: "Trust your feeling", desc: "Choose a place where you feel comfortable and safe." }
];

// Estimated vertical centers of the first 7 planks in the image.
const topOffsets = [
    "20%",   // Plank 1
    "29.5%", // Plank 2
    "39%",   // Plank 3
    "48.5%", // Plank 4
    "58%",   // Plank 5
    "67.5%", // Plank 6
    "77%"    // Plank 7
];

export default function TipsOverlayImage() {
    return (
        <div className="relative w-full max-w-lg mx-auto my-12 bg-[#FDFBF7] rounded-3xl overflow-hidden shadow-sm min-h-[600px] flex justify-center">
            {/* Fallback text if image missing */}
            <div className="absolute inset-0 bg-gray-200 flex items-center justify-center -z-10">
                <span className="text-gray-400">Please save tips-plank.jpg to public/images/blog/</span>
            </div>
            <Image
                src="/images/blog/tips-plank.jpg"
                alt="7 Tips for renting a home"
                width={800}
                height={1422}
                className="w-full h-auto block z-0 relative"
                priority
            />
            {points.map((pt, i) => (
                <div 
                    key={i} 
                    className="absolute left-0 w-full px-10 sm:px-14 flex flex-col justify-center items-center text-center"
                    style={{ top: topOffsets[i], transform: 'translateY(-50%)' }}
                >
                    <h3 className="text-[11px] sm:text-sm md:text-base font-extrabold text-[#222222] mb-[1px] md:mb-1 tracking-tight">
                        {pt.title}
                    </h3>
                    <p className="text-[9px] sm:text-[11px] md:text-sm text-[#333333] leading-tight max-w-[90%] font-medium">
                        {pt.desc}
                    </p>
                </div>
            ))}
        </div>
    );
}
