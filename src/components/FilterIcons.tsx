import React from 'react';

// Exact vector icons extracted directly from the user's official Figma SVG assets:
// - Dietary Filters.svg / Detary Filter.svg
// - Allergen Filters.svg / Allergen Filter.svg

export function DietaryIcon({ type, className = 'w-6 h-6 shrink-0' }: { type: string; className?: string }) {
  const t = (type || '').toLowerCase();
  let key = t;
  if (t.includes('pescatarian')) key = 'pescatarian';
  else if (t.includes('vegetarian')) key = 'vegetarian';
  else if (t.includes('vegan')) key = 'vegan';
  else if (t.includes('halal')) key = 'halal';
  else if (t.includes('purine') || t.includes('gout')) key = 'low-purine';
  else if (t.includes('sodium') || t.includes('hypertension')) key = 'low-sodium';
  else if (t.includes('sugar') || t.includes('diabetes')) key = 'low-sugar';
  else if (t.includes('protein')) key = 'high-protein';
  else if (t.includes('calorie')) key = 'low-calorie';
  else if (t === 'all') key = 'all';

  switch (key) {
    case 'all':
      return (
        <svg className={className} viewBox="11 5.5 28 28" fill="none">
          <circle cx="25" cy="19.5" r="12.5" fill="white" stroke="#4E986B" strokeWidth="2.1" />
          <rect x="19.5" y="14" width="4.45" height="4.45" rx="0.75" stroke="#141B34" strokeWidth="1.2" />
          <rect x="26.05" y="14" width="4.45" height="4.45" rx="0.75" stroke="#141B34" strokeWidth="1.2" />
          <rect x="19.5" y="20.55" width="4.45" height="4.45" rx="0.75" stroke="#141B34" strokeWidth="1.2" />
          <rect x="26.05" y="20.55" width="4.45" height="4.45" rx="0.75" stroke="#141B34" strokeWidth="1.2" />
        </svg>
      );

    case 'pescatarian':
      return (
        <svg className={className} viewBox="10 49.5 28 28" fill="none">
          <circle cx="24" cy="63.5" r="12.4615" fill="white" stroke="#4E986B" strokeWidth="2.07692" />
          <path d="M20.0603 63.7077L20.0529 63.7077" strokeWidth="1.66" strokeLinecap="round" strokeLinejoin="round" stroke="#141B34" />
          <path d="M25.2959 67.5728C26.1606 68.1781 26.7 69.1712 26.7 70.2579C26.7 70.311 26.6555 70.3541 26.6019 70.3538C24.1785 70.3431 23.0932 69.9328 22.637 69.2557L21.7154 67.7426C19.6455 67.3246 17.7429 66.0027 16.7308 63.7769C17.7429 61.5511 19.6455 60.2292 21.7154 59.8112M25.2959 67.5728C27.0989 67.0243 28.7064 65.759 29.6077 63.7769M25.2959 67.5728C24.9617 67.3388 24.5927 67.1925 24.2077 67.0655M25.296 59.981C26.1606 59.3757 26.7 58.3826 26.7 57.296C26.7 56.6093 23.1208 57.58 22.637 58.2981L21.7154 59.8112M25.296 59.981C25.296 59.981 25.296 59.981 25.2959 59.981M25.296 59.981C24.138 59.6287 22.8993 59.5721 21.7154 59.8112M25.296 59.981C27.0989 60.5295 28.7064 61.7948 29.6077 63.7769M21.7154 59.8112L21.7154 59.8112M29.6077 63.7769C29.8846 63.2288 31.3523 61.3105 33.3462 61.3105C32.6539 61.9956 31.5185 64.599 32.5154 66.2433C31.5185 66.2433 30.0231 64.325 29.6077 63.7769Z" strokeWidth="1.24615" strokeLinecap="round" strokeLinejoin="round" stroke="#141B34" />
        </svg>
      );

    case 'halal':
      return (
        <svg className={className} viewBox="10 93.5 28 28" fill="none">
          <circle cx="24" cy="107.5" r="12.4615" fill="white" stroke="#4E986B" strokeWidth="2.07692" />
          <path d="M28.1959 101.453L28.673 102.415C28.738 102.549 28.9115 102.677 29.0579 102.702L29.9226 102.847C30.4755 102.94 30.6056 103.344 30.2072 103.743L29.5349 104.421C29.4211 104.536 29.3587 104.757 29.394 104.916L29.5864 105.755C29.7382 106.419 29.3886 106.676 28.8058 106.329L27.9953 105.845C27.8489 105.758 27.6077 105.758 27.4586 105.845L26.6481 106.329C26.068 106.676 25.7157 106.416 25.8675 105.755L26.0599 104.916C26.0951 104.757 26.0328 104.536 25.919 104.421L25.2467 103.743C24.851 103.344 24.9784 102.94 25.5313 102.847L26.396 102.702C26.5397 102.677 26.7132 102.549 26.7782 102.415L27.2553 101.453C27.5155 100.931 27.9384 100.931 28.1959 101.453Z" strokeWidth="1.24615" strokeLinecap="round" strokeLinejoin="round" stroke="#141B34" />
          <path d="M24.1322 113.939C20.5033 113.939 17.5615 110.997 17.5615 107.368C17.5615 104.382 19.5533 101.861 22.2808 101.062C21.5811 102.025 21.1685 103.21 21.1685 104.491C21.1685 107.717 23.7834 110.332 27.0091 110.332C28.2905 110.332 29.4755 109.919 30.4384 109.219C29.639 111.947 27.1182 113.939 24.1322 113.939Z" strokeWidth="1.24615" strokeLinejoin="round" stroke="#141B34" />
        </svg>
      );

    case 'vegan':
      return (
        <svg className={className} viewBox="10 137.5 28 28" fill="none">
          <circle cx="24" cy="151.5" r="12.4615" fill="white" stroke="#4E986B" strokeWidth="2.07692" />
          <path d="M28.5692 150.669C28.5692 150.669 24.2077 153.577 24.2077 158.665" strokeWidth="1.24615" strokeLinecap="round" strokeLinejoin="round" stroke="#141B34" />
          <path d="M22.2805 151.529C21.1094 152.406 19.4414 152.312 18.3767 151.247C16.6149 149.486 16.9672 145.61 16.9672 145.61C16.9672 145.61 20.8432 145.257 22.6051 147.019C23.3026 147.716 23.5834 148.673 23.4476 149.579" strokeWidth="1.24615" strokeLinecap="round" strokeLinejoin="round" stroke="#141B34" />
          <path d="M26.3621 152.717C25.4028 151.675 25.4287 150.051 26.44 149.04C28.006 147.474 31.4514 147.787 31.4514 147.787C31.4514 147.787 31.7646 151.232 30.1985 152.798C29.6507 153.346 28.9233 153.605 28.2058 153.575" strokeWidth="1.24615" strokeLinecap="round" strokeLinejoin="round" stroke="#141B34" />
          <path d="M19.8462 148.488C19.8462 148.488 24.2077 152.123 24.2077 158.665" strokeWidth="1.24615" strokeLinecap="round" strokeLinejoin="round" stroke="#141B34" />
        </svg>
      );

    case 'vegetarian':
      return (
        <svg className={className} viewBox="160 49.5 28 28" fill="none">
          <circle cx="174" cy="63.5" r="12.4615" fill="white" stroke="#4E986B" strokeWidth="2.07692" />
          <path d="M177.323 64.89C177.323 64.89 176.757 64.6024 176.19 64.6024C175.341 64.6024 174.208 65.7527 174.208 67.4781C174.208 69.2035 175.759 70.3539 177.323 70.3539C178.887 70.3539 180.438 69.2035 180.438 67.4781C180.438 65.7527 179.306 64.6024 178.456 64.6024C177.89 64.6024 177.323 64.89 177.323 64.89ZM177.323 64.89C177.323 64.0273 177.89 62.877 179.022 62.877" strokeWidth="1.24615" strokeLinecap="round" strokeLinejoin="round" stroke="#141B34" />
          <path d="M168.675 60.0051C167.883 61.8562 166.673 68.7831 168.154 69.4162C169.635 70.0494 173.807 64.3888 174.598 62.5377C175.39 60.6866 175.865 59.576 172.903 58.3097C169.941 57.0434 169.466 58.154 168.675 60.0051Z" strokeWidth="1.24615" stroke="#141B34" />
          <path d="M174.256 62.4563L172.934 61.8914" strokeWidth="1.24615" strokeLinecap="round" strokeLinejoin="round" stroke="#141B34" />
          <path d="M168.405 61.5179L169.727 62.0828" strokeWidth="1.24615" strokeLinecap="round" strokeLinejoin="round" stroke="#141B34" />
          <path d="M171.68 66.0437L170.799 65.6671" strokeWidth="1.24615" strokeLinecap="round" strokeLinejoin="round" stroke="#141B34" />
          <path d="M171.166 53.8419C171.623 54.0372 172.116 54.6531 171.951 55.7979M177.333 56.4783C176.876 56.283 176.09 56.3521 175.377 57.2626M174.543 54.4746L173.81 56.1874" strokeWidth="1.24615" strokeLinecap="round" strokeLinejoin="round" stroke="#141B34" />
        </svg>
      );

    case 'low-calorie':
      return (
        <svg className={className} viewBox="107 93.5 28 28" fill="none">
          <circle cx="121" cy="107.5" r="12.4615" fill="white" stroke="#4E986B" strokeWidth="2.07692" />
          <path d="M125.116 105.838H114.565C113.372 105.838 112.935 106.114 113.233 107.314C113.758 109.429 115.244 109.954 116.618 111.335C116.936 111.655 116.432 112.175 116.432 112.536C116.431 113.231 117.092 113.281 117.619 113.281H122.062C122.589 113.281 123.25 113.231 123.249 112.536C123.249 112.167 122.729 111.671 123.063 111.335C124.437 109.954 125.923 109.429 126.448 107.314C126.746 106.114 126.309 105.838 125.116 105.838Z" strokeWidth="1.24615" strokeLinejoin="round" stroke="#141B34" />
          <path d="M119.096 102.091C118.834 101.739 118.451 101.484 118.009 101.386C116.585 101.071 115.301 102.607 115.907 103.977C114.979 104.083 114.259 104.876 114.259 105.838M118.009 101.386C118.363 99.3842 121.318 99.3842 121.672 101.386C123.129 101.064 124.36 102.625 123.779 103.965M122.817 104.121C124.008 103.597 125.422 104.506 125.422 105.838" strokeWidth="1.24615" strokeLinecap="round" strokeLinejoin="round" stroke="#141B34" />
          <path d="M126.904 115.021V110.615" strokeWidth="1.24615" strokeLinecap="round" strokeLinejoin="round" stroke="#141B34" />
          <path d="M128.863 113.226C128.863 113.226 127.42 115.185 126.904 115.185C126.388 115.185 124.946 113.226 124.946 113.226" strokeWidth="1.24615" strokeLinecap="round" strokeLinejoin="round" stroke="#141B34" />
        </svg>
      );

    case 'high-protein':
      return (
        <svg className={className} viewBox="113 137.5 28 28" fill="none">
          <circle cx="127" cy="151.5" r="12.4615" fill="white" stroke="#4E986B" strokeWidth="2.07692" />
          <path d="M123.458 147.45C123.458 145.538 125.137 143.988 127.208 143.988C129.279 143.988 130.958 145.538 130.958 147.45C130.958 148.509 131.198 149.699 131.848 150.572C132.469 151.407 132.833 152.418 132.833 153.508C132.833 156.375 130.314 158.7 127.208 158.7C124.101 158.7 121.583 156.375 121.583 153.508C121.583 152.418 121.946 151.407 122.568 150.572C123.217 149.699 123.458 148.509 123.458 147.45Z" strokeWidth="1.24615" stroke="#141B34" />
          <ellipse cx="127.208" cy="153.577" rx="3.32308" ry="3.53077" strokeWidth="1.24615" stroke="#141B34" fill="none" />
        </svg>
      );

    case 'low-purine':
      return (
        <svg className={className} viewBox="0 0 28 28" fill="none">
          <circle cx="14" cy="14" r="12.5" fill="white" strokeWidth="2.08" stroke="#4E986B" />
          <path d="M14 6.5C14 6.5 9 12 9 15.5C9 18.26 11.24 20.5 14 20.5C16.76 20.5 19 18.26 19 15.5C19 12 14 6.5 14 6.5Z" strokeWidth="1.25" stroke="#141B34" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14 11V15.5M11.5 13.5H16.5" strokeWidth="1.1" stroke="#4E986B" strokeLinecap="round" />
        </svg>
      );

    case 'low-sodium':
      return (
        <svg className={className} viewBox="0 0 28 28" fill="none">
          <circle cx="14" cy="14" r="12.5" fill="white" strokeWidth="2.08" stroke="#4E986B" />
          <path d="M11 9.5H17M12 9.5L10.5 18C10.5 18.8 11.2 19.5 12 19.5H16C16.8 19.5 17.5 18.8 17.5 18L16 9.5" strokeWidth="1.25" stroke="#141B34" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="13" cy="13.5" r="0.75" fill="#141B34" />
          <circle cx="15" cy="13.5" r="0.75" fill="#141B34" />
          <circle cx="14" cy="16" r="0.75" fill="#141B34" />
        </svg>
      );

    case 'low-sugar':
      return (
        <svg className={className} viewBox="0 0 28 28" fill="none">
          <circle cx="14" cy="14" r="12.5" fill="white" strokeWidth="2.08" stroke="#4E986B" />
          <rect x="9.5" y="11" width="5.5" height="5.5" rx="1" strokeWidth="1.2" stroke="#141B34" />
          <rect x="13" y="13.5" width="5.5" height="5.5" rx="1" strokeWidth="1.2" stroke="#141B34" />
          <path d="M18.5 8.5L9.5 19.5" strokeWidth="1.25" stroke="#4E986B" strokeLinecap="round" />
        </svg>
      );

    default:
      return (
        <svg className={className} viewBox="0 0 28 28" fill="none">
          <circle cx="14" cy="14" r="12.5" fill="white" strokeWidth="2.08" stroke="#4E986B" />
          <circle cx="14" cy="14" r="4" fill="#4E986B" />
        </svg>
      );
  }
}

export function AllergenIcon({ type, className = 'w-6 h-6 shrink-0' }: { type: string; className?: string }) {
  const t = (type || '').toLowerCase();
  let key = t;
  if (t.includes('shellfish') || t.includes('hipon') || t.includes('alimango')) key = 'shellfish';
  else if (t.includes('dairy') || t.includes('gatas')) key = 'dairy';
  else if (t.includes('gluten') || t.includes('trigo')) key = 'gluten';
  else if (t.includes('peanut') || t.includes('nut') || t.includes('mani')) key = 'nut';
  else if (t.includes('egg') || t.includes('itlog')) key = 'egg';
  else if (t.includes('fish') || t.includes('isda')) key = 'fish';
  else if (t.includes('soy') || t.includes('balatong')) key = 'soy';

  switch (key) {
    case 'shellfish':
      return (
        <svg className={className} viewBox="10 5.5 28 28" fill="none">
          <circle cx="24" cy="19.5" r="12.4615" fill="white" stroke="#D96969" strokeWidth="2.07692" />
          <path d="M25.6391 14.4604C25.6873 14.6816 25.7 14.917 25.6705 15.1581L25.1413 19.4821M25.6391 14.4604C25.2321 12.5952 22.7678 12.5952 22.3609 14.4604M25.6391 14.4604C26.6481 13.3098 28.4593 14.4553 28.5069 15.8938M28.5069 15.8938C29.1508 16.0139 30.4384 16.6843 30.4384 18.406C30.4384 19.9609 28.7598 21.6032 27.1013 22.9086C26.7266 23.2036 26.5391 23.3511 26.4192 23.458C26.0493 23.7876 25.8157 24.055 25.5301 24.4756C25.4376 24.6119 25.3416 24.7722 25.1499 25.0926L25.0003 25.3427C24.7776 25.7148 24.4021 25.9384 24 25.9384C23.5978 25.9384 23.2224 25.7148 22.9997 25.3427L22.8501 25.0926C22.6583 24.7721 22.5624 24.6119 22.4699 24.4756C22.1843 24.055 21.9507 23.7876 21.5807 23.458C21.4609 23.3511 21.2734 23.2036 20.8986 22.9086C19.2402 21.6032 17.5615 19.9609 17.5615 18.406C17.5615 16.6843 18.8492 16.0139 19.4931 15.8938M28.5069 15.8938C28.5504 17.2099 27.741 18.9766 27.0245 20.1994M22.3609 14.4604C22.3127 14.6816 22.2999 14.917 22.3294 15.1581L22.8586 19.4821M22.3609 14.4604C21.3518 13.3098 19.5406 14.4553 19.4931 15.8938M19.4931 15.8938C19.4495 17.2099 20.259 18.9766 20.9754 20.1994" stroke="#141B34" strokeWidth="1.24615" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M27.8631 22.3616L27.3745 25.0759C27.2842 25.5774 26.8878 25.9385 26.4275 25.9385H21.5725C21.1121 25.9385 20.7158 25.5774 20.6255 25.0759L20.1369 22.3616" stroke="#141B34" strokeWidth="1.24615" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="24" cy="19.5" r="12.4615" stroke="#D96969" strokeWidth="2.07692" />
          <line x1="17.5948" y1="8.74702" x2="31.7179" y2="29.9316" stroke="#D96969" strokeWidth="2.07692" />
        </svg>
      );

    case 'dairy':
      return (
        <svg className={className} viewBox="158 5.5 28 28" fill="none">
          <circle cx="172" cy="19.5" r="12.47" fill="white" stroke="#D96969" strokeWidth="2.06009" />
          <path d="M173.93 14.1208C174.624 14.1208 175.187 13.6047 175.187 12.9681C175.187 12.3314 174.624 11.8154 173.93 11.8154H169.738C169.044 11.8154 168.481 12.3314 168.481 12.9681C168.481 13.6047 169.044 14.1208 169.738 14.1208M174.328 14.0617C175.573 16.3447 176.445 18.253 176.445 20.8656V24.1108C176.445 26.6538 175.866 27.1846 173.091 27.1846H170.576C167.802 27.1846 167.223 26.6538 167.223 24.1108V20.8656C167.223 18.253 168.074 16.3382 169.319 14.0552" stroke="#141B34" strokeWidth="1.23605" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M167.223 19.5001C167.662 19.8843 168.831 19.8659 169.516 19.7144C169.995 19.6088 170.51 19.7327 170.834 20.0871L171.467 20.7802C171.832 21.1788 172.384 21.3681 172.929 21.2808L173.73 21.1522C174.172 21.0814 174.61 21.2601 174.911 21.5792C175.847 22.5739 176.445 22.5739 176.445 22.5739" stroke="#141B34" strokeWidth="1.23605" strokeLinejoin="round" />
          <circle cx="172" cy="19.5" r="12.47" stroke="#D96969" strokeWidth="2.06009" />
          <line x1="165.588" y1="8.75169" x2="179.711" y2="29.9363" stroke="#D96969" strokeWidth="2.06009" />
        </svg>
      );

    case 'nut':
      return (
        <svg className={className} viewBox="147 44.5 28 28" fill="none">
          <circle cx="161" cy="58.5" r="12.4615" fill="white" stroke="#D96969" strokeWidth="2.07692" />
          <path d="M158.725 54.4845C157.213 55.3816 155.588 57.1694 155.135 58.8182C154.841 59.6112 154.676 61.3236 155.977 63.6104C156.243 64.1473 156.796 65.3169 156.729 65.7405C157.075 65.4907 158.362 65.4642 158.958 65.4633C161.571 65.6101 163.018 64.6948 163.591 64.0751C164.853 62.929 165.713 60.6662 165.833 58.9035" stroke="#141B34" strokeWidth="1.24615" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M168.016 51.393C167.471 51.1799 166.071 51.063 164.975 52.444M163.387 51.8561C161.216 51.278 159.709 51.8059 158.945 52.3572C158.821 52.4464 158.717 52.5634 158.658 52.7047C158.206 53.7967 159.394 55.0029 161.526 56.6295C161.879 56.8993 162.258 57.136 162.656 57.3342C165 58.5024 166.747 59.0943 167.519 58.1732C167.603 58.0726 167.655 57.9491 167.681 57.8202C167.907 56.7035 167.429 55.0626 166.067 53.5162C165.358 52.7117 164.42 52.1311 163.387 51.8561Z" stroke="#141B34" strokeWidth="1.24615" strokeLinecap="round" />
          <circle cx="161" cy="58.5" r="12.4615" stroke="#D96969" strokeWidth="2.07692" />
          <line x1="154.595" y1="47.747" x2="168.718" y2="68.9316" stroke="#D96969" strokeWidth="2.07692" />
        </svg>
      );

    case 'gluten':
      return (
        <svg className={className} viewBox="10 44.5 28 28" fill="none">
          <circle cx="24" cy="58.5" r="12.4615" fill="white" stroke="#D96969" strokeWidth="2.07692" />
          <path d="M16.6512 55.4478C16.6512 53.9193 19.018 52.6802 21.7065 52.6802C24.3951 52.6802 26.7619 53.9193 26.7619 55.4478C26.7619 56.509 25.4843 57.2988 25.6471 58.2959L25.837 61.8402C25.9195 63.3807 25.9608 64.1509 25.5176 64.6375C25.0744 65.124 24.3315 65.124 22.8458 65.124H20.5672C19.0816 65.124 18.3387 65.124 17.8955 64.6375C17.4523 64.1509 17.4936 63.3807 17.5761 61.8402L17.766 58.2959C17.9288 57.2988 16.6512 56.509 16.6512 55.4478Z" stroke="#141B34" strokeWidth="1.24615" />
          <path d="M23.6509 65.124H28.4603C29.8814 65.124 30.5919 65.124 31.0159 64.6375C31.4398 64.1509 31.4003 63.3807 31.3214 61.8402L31.1397 58.2959C30.984 57.2988 32.206 56.509 32.206 55.4478C32.206 53.9193 29.9422 52.6802 27.3705 52.6802H21.3177" stroke="#141B34" strokeWidth="1.24615" />
          <circle cx="24" cy="58.5" r="12.4615" stroke="#D96969" strokeWidth="2.07692" />
          <line x1="17.5948" y1="47.747" x2="31.7179" y2="68.9316" stroke="#D96969" strokeWidth="2.07692" />
        </svg>
      );

    case 'egg':
      return (
        <svg className={className} viewBox="10 85.5 28 28" fill="none">
          <circle cx="24" cy="99.5" r="12.4615" fill="white" stroke="#D96969" strokeWidth="2.07692" />
          <path d="M24 94.5538C25.4461 93.2839 27.2314 92.6335 28.6194 93.373C30.7809 94.5245 30.8985 98.4706 29.5911 101.151C29.0419 102.277 28.3158 102.993 27.5035 103.363" stroke="#141B34" strokeWidth="1.24615" strokeLinecap="round" />
          <path d="M25.9316 101.753C25.9316 104.598 24.0579 105.938 21.7466 105.938C19.4352 105.938 17.5616 104.598 17.5616 101.753C17.5616 98.9087 19.3551 95.6369 21.7466 95.6369C24.138 95.6369 25.9316 98.9087 25.9316 101.753Z" stroke="#141B34" strokeWidth="1.24615" />
          <circle cx="24" cy="99.5" r="12.4615" stroke="#D96969" strokeWidth="2.07692" />
          <line x1="17.5948" y1="88.747" x2="31.7179" y2="109.932" stroke="#D96969" strokeWidth="2.07692" />
        </svg>
      );

    case 'fish':
      return (
        <svg className={className} viewBox="129 85.5 28 28" fill="none">
          <circle cx="143" cy="99.5" r="12.4615" fill="white" stroke="#D96969" strokeWidth="2.07692" />
          <path d="M138.645 99.2923L138.637 99.2923" stroke="#141B34" strokeWidth="1.66154" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M143.881 103.157C144.745 103.763 145.285 104.756 145.285 105.843C145.285 105.896 145.24 105.939 145.186 105.938C142.763 105.928 141.678 105.517 141.222 104.84L140.3 103.327C138.23 102.909 136.328 101.587 135.315 99.3615C136.328 97.1358 138.23 95.8139 140.3 95.3958M143.881 103.157C145.684 102.609 147.291 101.344 148.192 99.3615M143.881 103.157C143.546 102.923 143.177 102.777 142.792 102.65M143.881 95.5657C144.745 94.9604 145.285 93.9673 145.285 92.8806C145.285 92.1939 141.705 93.1646 141.222 93.8827L140.3 95.3958M143.881 95.5657C143.881 95.5657 143.881 95.5657 143.881 95.5657M143.881 95.5657C142.723 95.2133 141.484 95.1567 140.3 95.3958M143.881 95.5657C145.684 96.1142 147.291 97.3795 148.192 99.3615M140.3 95.3958L140.3 95.3959M148.192 99.3615C148.469 98.8135 149.937 96.8951 151.931 96.8951C151.238 97.5802 150.103 100.184 151.1 101.828C150.103 101.828 148.608 99.9096 148.192 99.3615Z" stroke="#141B34" strokeWidth="1.24615" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="143" cy="99.5" r="12.4615" stroke="#D96969" strokeWidth="2.07692" />
          <line x1="136.595" y1="88.747" x2="150.718" y2="109.932" stroke="#D96969" strokeWidth="2.07692" />
        </svg>
      );

    case 'soy':
      return (
        <svg className={className} viewBox="0 0 28 28" fill="none">
          <circle cx="14" cy="14" r="12.46" fill="white" stroke="#D96969" strokeWidth="2.08" />
          <path d="M10 18C11.5 19.5 14 20 17 18C19 16.5 19.5 14 19 11.5C18.5 9.5 17 8.5 15 9.5C13 10.5 11.5 13 10 18Z" strokeWidth="1.25" stroke="#141B34" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <circle cx="13.5" cy="15" r="1.3" fill="#141B34" />
          <circle cx="16.5" cy="12.5" r="1.3" fill="#141B34" />
          <circle cx="14" cy="14" r="12.46" stroke="#D96969" strokeWidth="2.08" />
          <line x1="7.6" y1="3.2" x2="20.4" y2="24.8" stroke="#D96969" strokeWidth="2.08" />
        </svg>
      );

    default:
      return (
        <svg className={className} viewBox="0 0 28 28" fill="none">
          <circle cx="14" cy="14" r="12.46" fill="white" stroke="#D96969" strokeWidth="2.08" />
          <circle cx="14" cy="14" r="12.46" stroke="#D96969" strokeWidth="2.08" />
          <line x1="7.6" y1="3.2" x2="20.4" y2="24.8" stroke="#D96969" strokeWidth="2.08" />
        </svg>
      );
  }
}
