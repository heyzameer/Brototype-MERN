export default interface IHostProfileUseCase {
  getProfile(id: string): Promise<any>;
}
