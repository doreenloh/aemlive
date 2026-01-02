/*
 * Copyright 2025 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import { createOptimizedPicture } from '../../scripts/aem.js';

/**
 * Decorates the hero block
 * @param {Element} block The hero block element
 */
export default function decorate(block) {
  const rows = [...block.children];
  const heroContent = document.createElement('div');
  heroContent.className = 'hero-content';

  rows.forEach((row) => {
    const cols = [...row.children];
    cols.forEach((col) => {
      // Check if column contains a picture
      const picture = col.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        if (img && !img.src.includes('placeholder')) {
          const optimizedPicture = createOptimizedPicture(
            img.src,
            img.alt || 'Hero image',
            true,
            [{ media: '(min-width: 900px)', width: '2000' }, { width: '750' }],
          );
          picture.replaceWith(optimizedPicture);
        }
        heroContent.appendChild(col);
      } else {
        // Text content
        heroContent.appendChild(col);
      }
    });
  });

  block.textContent = '';
  block.appendChild(heroContent);
}

