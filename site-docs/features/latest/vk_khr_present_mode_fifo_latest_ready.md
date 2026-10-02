# VK_KHR_present_mode_fifo_latest_ready

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/VK_KHR_present_mode_fifo_latest_ready.html

## Content

This extension adds a new present mode, `VK_PRESENT_MODE_FIFO_LATEST_READY_KHR`,
which allows the presentation engine to dequeue multiple present requests during
vblank, in FIFO order, until encountering a request that is not ready.

This extension is a promotion of
[`VK_EXT_present_mode_fifo_latest_ready`](../../../../refpages/latest/refpages/source/VK_EXT_present_mode_fifo_latest_ready.html) to `KHR`.
Its API and behavior is identical to the original `EXT` extension.
For more details, please refer to the original extension’s
[proposal](../../../../refpages/latest/refpages/source/VK_EXT_present_mode_fifo_latest_ready.html).
