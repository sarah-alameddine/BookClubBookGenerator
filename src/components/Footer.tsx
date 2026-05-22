type ImageProp = {
  title: string;
  src: string;
};

export default function Footer({ src, title }: ImageProp) {
  return (
    <footer className="mt-auto border-t border-base-300 bg-base-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img className="h-8 w-8 rounded-full" src={src} alt={title} />

          <div className="flex flex-col">
            <p className="text-sm text-base-content/80">Booklings Book Club</p>

            <p className="text-xs text-base-content/60">
              Made for my Book Club 😊
            </p>
          </div>
        </div>

        <a
          href="https://github.com/sarah-alameddine/BookClubBookGenerator"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
          className="text-base-content/60 hover:text-base-content transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 .5C5.649.5.5 5.649.5 12a11.5 11.5 0 008 10.95c.6.112.82-.262.82-.582 0-.287-.01-1.047-.016-2.055-3.252.707-3.938-1.567-3.938-1.567-.532-1.352-1.3-1.712-1.3-1.712-1.063-.727.08-.713.08-.713 1.175.083 1.793 1.207 1.793 1.207 1.045 1.79 2.742 1.273 3.41.974.106-.757.41-1.273.745-1.566-2.596-.295-5.325-1.298-5.325-5.78 0-1.277.456-2.322 1.205-3.14-.12-.296-.522-1.486.114-3.097 0 0 .982-.314 3.218 1.2a11.18 11.18 0 015.86 0c2.234-1.514 3.215-1.2 3.215-1.2.638 1.61.236 2.8.116 3.097.75.818 1.203 1.863 1.203 3.14 0 4.494-2.733 5.482-5.337 5.772.422.363.798 1.08.798 2.177 0 1.572-.014 2.84-.014 3.226 0 .322.216.699.825.58A11.502 11.502 0 0023.5 12C23.5 5.649 18.351.5 12 .5z" />
          </svg>
        </a>
      </div>
    </footer>
  );
}
