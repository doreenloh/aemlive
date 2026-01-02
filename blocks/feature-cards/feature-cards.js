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

import { decorateButtons } from '../../scripts/aem.js';

/**
 * Decorates the feature-cards block
 * @param {Element} block The feature-cards block element
 */
export default function decorate(block) {
  const rows = [...block.children];
  const cards = [];

  rows.forEach((row, rowIndex) => {
    const cols = [...row.children];
    if (cols.length > 0) {
      const card = document.createElement('div');
      card.className = 'feature-card';

      // First column: title/heading
      if (cols[0]) {
        const heading = cols[0].querySelector('h2, h3, h4, h5, h6');
        if (heading) {
          const cardTitle = document.createElement('div');
          cardTitle.className = 'feature-card-title';
          cardTitle.appendChild(heading);
          card.appendChild(cardTitle);
        } else {
          const cardTitle = document.createElement('div');
          cardTitle.className = 'feature-card-title';
          cardTitle.innerHTML = cols[0].innerHTML;
          card.appendChild(cardTitle);
        }
      }

      // Second column: description/content
      if (cols[1]) {
        const cardContent = document.createElement('div');
        cardContent.className = 'feature-card-content';
        cardContent.innerHTML = cols[1].innerHTML;
        decorateButtons(cardContent);
        card.appendChild(cardContent);
      }

      // Third column: image (optional)
      if (cols[2]) {
        const cardImage = document.createElement('div');
        cardImage.className = 'feature-card-image';
        const picture = cols[2].querySelector('picture');
        if (picture) {
          cardImage.appendChild(picture);
        } else {
          cardImage.innerHTML = cols[2].innerHTML;
        }
        card.appendChild(cardImage);
      }

      cards.push(card);
    }
  });

  block.textContent = '';
  const container = document.createElement('div');
  container.className = 'feature-cards-container';
  cards.forEach((card) => container.appendChild(card));
  block.appendChild(container);
}

