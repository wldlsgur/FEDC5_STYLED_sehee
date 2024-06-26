import { ForwardedRef, forwardRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { AvatarProp } from './type';
import { StyledImage, StyledAvatar, StyledWrapper } from './style';

const Avatar = forwardRef(
  (
    {
      children,
      src,
      alt,
      size = 20,
      shape = 'circle',
      mode = 'cover',
      wrapperProps,
      containerProps,
      ...props
    }: AvatarProp,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const [loadedSrc, setLoadedSrc] = useState('');
    const { ref: inViewRef, inView } = useInView({
      triggerOnce: true,
      rootMargin: '50px 0px',
    });

    if (inView && !loadedSrc) {
      setLoadedSrc(
        src ||
          'https://user-images.githubusercontent.com/17202261/101670093-195d9180-3a96-11eb-9bd4-9f31cbe44aea.png',
      );
    }

    return (
      <StyledWrapper
        $size={size}
        ref={ref}
        {...wrapperProps}
      >
        <StyledAvatar
          $shape={shape}
          {...containerProps}
          ref={inViewRef}
        >
          <StyledImage
            src={loadedSrc}
            alt={alt}
            $size={size}
            $mode={mode}
            {...props}
          />
        </StyledAvatar>
        {children}
      </StyledWrapper>
    );
  },
);

Avatar.displayName = 'Avatar';

export default Avatar;
