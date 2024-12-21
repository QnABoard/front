import React, { useState } from 'react';
import styled from 'styled-components';

interface ImageUploadProps {
  initialPreview?: string;
  onUpload: (file: File) => void;
  isUploading: boolean;
}

const ImageUpload = ({
  initialPreview,
  onUpload,
  isUploading,
}: ImageUploadProps) => {
  const [preview, setPreview] = useState<string | null>(initialPreview || null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      onUpload(file);
    }
  };

  return (
    <Container>
      <Label htmlFor='profile-image'>
        <ImageContainer>
          {preview ? <Image src={preview} alt='미리보기' /> : <Placeholder />}
        </ImageContainer>
      </Label>
      <HiddenInput
        type='file'
        id='profile-image'
        accept='image/*'
        onChange={handleImageChange}
        disabled={isUploading}
      />
      {isUploading && <UploadingText>업로드 중...</UploadingText>}
    </Container>
  );
};

export default ImageUpload;

const Container = styled.div`
  text-align: center;
`;

const Label = styled.label`
  display: inline-block;
  cursor: pointer;
`;

const ImageContainer = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #f0f0f0;
  border: 2px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Placeholder = styled.div`
  width: 100%;
  height: 100%;
  background-color: #e0e0e0;
`;

const HiddenInput = styled.input`
  display: none;
`;

const UploadingText = styled.p`
  margin-top: 10px;
  font-size: 14px;
  color: gray;
`;
