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

/**
 * Decorates the banner block
 * @param {Element} block The banner block element
 */
export default function decorate(block) {
  const rows = [...block.children];
  const banner = document.createElement('div');
  banner.className = 'banner-content';

  rows.forEach((row) => {
    const cols = [...row.children];
    if (cols.length > 0) {
      const message = cols[0];
      if (message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'banner-message';
        messageDiv.innerHTML = message.innerHTML;
        banner.appendChild(messageDiv);
      }

      if (cols.length > 1) {
        const link = cols[1].querySelector('a');
        if (link) {
          link.className = 'banner-link';
          banner.appendChild(cols[1]);
        }
      }
    }
  });

  // Add close button
  const closeButton = document.createElement('button');
  closeButton.className = 'banner-close';
  closeButton.setAttribute('aria-label', 'Close banner');
  closeButton.innerHTML = '×';
  closeButton.addEventListener('click', () => {
    block.style.display = 'none';
    sessionStorage.setItem('banner-dismissed', 'true');
  });

  // Check if banner was previously dismissed
  if (sessionStorage.getItem('banner-dismissed') === 'true') {
    block.style.display = 'none';
  }

  block.textContent = '';
  block.appendChild(banner);
  block.appendChild(closeButton);
}

