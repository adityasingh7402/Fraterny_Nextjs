export interface Page {
    id: string;
    slug: string;
    name: string;
    description: string | null;
    created_at: string;
}

export interface PageSection {
    id: string;
    page_id: string;
    section_key: string;
    name: string;
    allowed_images: number;
    created_at: string;
}

export interface PageSectionWithPage extends PageSection {
    pages: {
        slug: string;
        name: string;
    };
}

export interface WebsiteImage {
    id: string;
    key: string;
    storage_path: string;
    alt_text: string | null;
    category: string | null;
    width: number | null;
    height: number | null;
}

export interface PageSectionImage {
    id: string;
    section_id: string;
    image_id: string;
    sort_order: number;
    created_at: string;
    website_images?: WebsiteImage;
}

export interface SectionWithImages extends PageSection {
    images: PageSectionImage[];
    imageCount?: number;
}

export interface PageFormValues {
    slug: string;
    name: string;
    description: string;
}

export interface SectionFormValues {
    section_key: string;
    name: string;
    allowed_images: number;
}
