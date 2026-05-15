# VK_KHR_present_mode_fifo_latest_ready(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_present_mode_fifo_latest_ready.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_present_mode_fifo_latest_ready](#VK_KHR_present_mode_fifo_latest_ready)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_present_mode_fifo_latest_ready - device extension

**Name String**

`VK_KHR_present_mode_fifo_latest_ready`

**Extension Type**

Device extension

**Registered Extension Number**

622

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_swapchain](VK_KHR_swapchain.html)

**Contact**

* 
Lionel Duc [nvlduc](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_present_mode_fifo_latest_ready] @nvlduc%0A*Here describe the issue or question you have about the VK_KHR_present_mode_fifo_latest_ready extension*)

**Extension Proposal**

[VK_KHR_present_mode_fifo_latest_ready](../../../../features/latest/features/proposals/VK_KHR_present_mode_fifo_latest_ready.html)

**Last Modified Date**

2025-03-18

**IP Status**

No known IP claims.

**Contributors**

* 
James Jones, NVIDIA

* 
Lionel Duc, NVIDIA

* 
Lina Versace, Google

This extension is based on `[VK_EXT_present_mode_fifo_latest_ready](VK_EXT_present_mode_fifo_latest_ready.html)`
and provides equivalent functionality.

This extension adds a new present mode,
[VK_PRESENT_MODE_FIFO_LATEST_READY_KHR](VkPresentModeKHR.html).

This tear-free present mode behaves much like
[VK_PRESENT_MODE_FIFO_KHR](VkPresentModeKHR.html), except that each vertical blanking period
dequeues consecutive present requests until the latest ready is found to
update the current image.

While this seems similar in concept to [VK_PRESENT_MODE_MAILBOX_KHR](VkPresentModeKHR.html),
the fundamental difference is that the processing of the present requests is
done during vblank.
From the application perspective, this means for example, that in a
flip-based model, a single vblank **may** cause multiple swapchain images to be
released at once, while [VK_PRESENT_MODE_MAILBOX_KHR](VkPresentModeKHR.html) **may** continuously
be releasing images as new requests become ready.

This additional present mode is useful when using a time-based present API.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDevicePresentModeFifoLatestReadyFeaturesKHR](VkPhysicalDevicePresentModeFifoLatestReadyFeaturesKHR.html)

* 
`VK_KHR_PRESENT_MODE_FIFO_LATEST_READY_EXTENSION_NAME`

* 
`VK_KHR_PRESENT_MODE_FIFO_LATEST_READY_SPEC_VERSION`

* 
Extending [VkPresentModeKHR](VkPresentModeKHR.html):

[VK_PRESENT_MODE_FIFO_LATEST_READY_KHR](VkPresentModeKHR.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PRESENT_MODE_FIFO_LATEST_READY_FEATURES_KHR](VkStructureType.html)

* 
Revision 1, 2025-03-18 (Lina Versace)

Internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_present_mode_fifo_latest_ready).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
