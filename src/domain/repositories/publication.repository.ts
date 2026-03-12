import { Publication } from "../entities/publication.entity";


export interface PublicationRepository{
  createPublication(publication: Publication): Promise<Publication>;
}