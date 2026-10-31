export interface UserProfileDto {
  userId: number;
  nickname: string;
  /** Kakao account email */
  email: string;
  /** null when the user has no profile image */
  profileImageUrl: string | null;
}
