import { Project } from './types';

export const INITIAL_PROJECTS: Project[] = [
  // Spatial Design
  { 
    id: 's1', 
    name: '아이엠샵', 
    category: 'spatial', 
    thumbnailUrl: 'https://picsum.photos/seed/iamshop/1200/800',
    description: '아이엠샵의 공간 디자인 프로젝트입니다. 미니멀리즘과 기능성을 강조한 인테리어로 브랜드의 아이덴티티를 공간에 녹여냈습니다.',
    additionalImages: [
      'https://picsum.photos/seed/iam1/800/800',
      'https://picsum.photos/seed/iam2/800/800',
      'https://picsum.photos/seed/iam3/800/800',
      'https://picsum.photos/seed/iam4/800/800'
    ]
  },
  { 
    id: 's2', 
    name: '연희와인', 
    category: 'spatial', 
    thumbnailUrl: 'https://picsum.photos/seed/yeonhui/1200/800',
    description: '연희동에 위치한 와인 바 연희와인의 공간 디자인입니다. 따뜻한 조명과 목재 소재를 활용하여 아늑하고 고급스러운 분위기를 연출했습니다.',
    additionalImages: [
      'https://picsum.photos/seed/yh1/800/800',
      'https://picsum.photos/seed/yh2/800/800'
    ]
  },
  { id: 's3', name: '탈롱', category: 'spatial', thumbnailUrl: 'https://picsum.photos/seed/talon/1200/800' },
  { id: 's4', name: '시현하다', category: 'spatial', thumbnailUrl: 'https://picsum.photos/seed/sihyun/1200/800' },
  { id: 's5', name: '에이뮤지엄', category: 'spatial', thumbnailUrl: 'https://picsum.photos/seed/amuseum/1200/800' },
  { id: 's6', name: '헤르츠', category: 'spatial', thumbnailUrl: 'https://picsum.photos/seed/hertz/1200/800' },
  // Video Production
  { 
    id: 'v1', 
    name: '한복엑스포', 
    category: 'video', 
    thumbnailUrl: 'https://picsum.photos/seed/hanbok/1200/800',
    description: '2026 한복 엑스포 홍보 영상 제작 프로젝트입니다. 전통의 아름다움을 현대적인 감각으로 재해석하여 영상에 담았습니다.',
    additionalImages: [
      'https://picsum.photos/seed/hb1/800/800',
      'https://picsum.photos/seed/hb2/800/800'
    ]
  },
  { id: 'v2', name: 'OAF이세탄', category: 'video', thumbnailUrl: 'https://picsum.photos/seed/oaf/1200/800' },
  { id: 'v3', name: '에이뮤지엄', category: 'video', thumbnailUrl: 'https://picsum.photos/seed/amuseum_vid/1200/800' },
  { id: 'v4', name: 'MGA 모델링', category: 'video', thumbnailUrl: 'https://picsum.photos/seed/mga/1200/800' },
];

export const DEFAULT_SEO = {
  title: 'Fingersnaps | Creative Studio',
  description: 'Fingersnaps는 공간 디자인과 영상 제작을 기반으로 시각적 경험을 설계하는 크리에이티브 팀입니다.',
  keywords: '공간디자인, 영상제작, 크리에이티브, 포트폴리오, 인테리어, 브랜딩'
};
