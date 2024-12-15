import styled from 'styled-components';

interface AvatarProps {
  size?: 'big' | 'small';
  disabled?: boolean;
  src: string;
  alt?: string;
}

const cx = (...classes: (string | boolean | undefined)[]) =>
  classes.filter(Boolean).join(' ');

const styles = {
  base: `
    display: inline-block;
    border-radius: 50%;
    overflow: hidden;
    object-fit: cover;
  `,
  big: `
    width: 200px;
    height: 200px;
  `,
  small: `
    width: 64px;
    height: 64px;
  `,
  disabled: `
    opacity: 0.5;
    pointer-events: none;
  `,
};

const Avatar = styled.img.attrs<AvatarProps>(({ src, alt }) => ({
  src,
  alt: alt || 'Avatar',
}))<AvatarProps>`
  ${({ size, disabled }) =>
    cx(
      styles.base,
      size === 'big' && styles.big,
      size === 'small' && styles.small,
      disabled && styles.disabled
    )}
`;

export default Avatar;
