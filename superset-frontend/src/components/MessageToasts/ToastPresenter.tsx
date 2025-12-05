/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import { styled } from '@apache-superset/core/ui';
import { ToastMeta } from 'src/components/MessageToasts/types';
import Toast from './Toast';

export interface VisualProps {
  position: 'bottom' | 'top';
}

const StyledToastPresenter = styled.div<VisualProps>(({ theme, position }) => {
  const verticalPosition = position === 'bottom' ? 'bottom' : 'top';
  const verticalOffset = theme.sizeUnit * 6;
  const horizontalPadding = theme.sizeUnit * 4;

  return `
    max-width: 600px;
    width: calc(100% - ${horizontalPadding * 2}px);
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    ${verticalPosition}: ${verticalOffset}px;
    padding: 0 ${horizontalPadding}px;
    z-index: ${theme.zIndexPopupBase + 1};
    word-break: break-word;
    display: flex;
    flex-direction: column;
    align-items: center;

    .toast {
      padding: ${theme.sizeUnit * 4}px;
      margin: ${theme.sizeUnit * 4}px;
      background: ${theme.colorBgSpotlight};
      border-radius: ${theme.borderRadius}px;
      box-shadow: ${theme.boxShadow};
      color: ${theme.colorTextLightSolid};
      opacity: 0;
      position: relative;
      transform: translateY(-100%);
      white-space: pre-line;
      will-change: transform, opacity;
      transition:
        transform ${theme.motionDurationMid},
        opacity ${theme.motionDurationMid};
      &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 6px;
        height: 100%;
      }
    }

    .toast > button {
      color: ${theme.colorTextLightSolid};
      opacity: 1;
    }

    .toast--visible {
      opacity: 1;
      transform: translateY(0);
    }
  `;
});

type ToastPresenterProps = Partial<VisualProps> & {
  toasts: Array<ToastMeta>;
  removeToast: () => any;
};

export default function ToastPresenter({
  toasts,
  removeToast,
  position = 'top',
}: ToastPresenterProps) {
  return (
    <>
      {toasts.length > 0 && (
        <StyledToastPresenter id="toast-presenter" position={position}>
          {toasts.map(toast => (
            <Toast key={toast.id} toast={toast} onCloseToast={removeToast} />
          ))}
        </StyledToastPresenter>
      )}
    </>
  );
}
