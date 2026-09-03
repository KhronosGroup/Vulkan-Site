# VK_EXT_present_mode_fifo_latest_ready(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_present_mode_fifo_latest_ready.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_present_mode_fifo_latest_ready](#VK_EXT_present_mode_fifo_latest_ready)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [Promotion to VK_KHR_present_mode_fifo_latest_ready](#_promotion_to_vk_khr_present_mode_fifo_latest_ready)
- [Promotion_to_VK_KHR_present_mode_fifo_latest_ready](#_promotion_to_vk_khr_present_mode_fifo_latest_ready)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_present_mode_fifo_latest_ready - device extension

**Name String**

`VK_EXT_present_mode_fifo_latest_ready`

**Extension Type**

Device extension

**Registered Extension Number**

362

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_swapchain](VK_KHR_swapchain.html)

**Deprecation State**

* 
*Promoted* to
[VK_KHR_present_mode_fifo_latest_ready](VK_KHR_present_mode_fifo_latest_ready.html)
extension

**Contact**

* 
Lionel Duc [nvlduc](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_present_mode_fifo_latest_ready] @nvlduc%0A*Here describe the issue or question you have about the VK_EXT_present_mode_fifo_latest_ready extension*)

**Extension Proposal**

[VK_EXT_present_mode_fifo_latest_ready](../../../../features/latest/features/proposals/VK_EXT_present_mode_fifo_latest_ready.html)

**Last Modified Date**

2024-05-28

**IP Status**

No known IP claims.

**Contributors**

* 
James Jones, NVIDIA

* 
Lionel Duc, NVIDIA

This device extension adds a new present mode,
[VK_PRESENT_MODE_FIFO_LATEST_READY_EXT](VkPresentModeKHR.html).

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

All functionality in this extension is included in
`[VK_KHR_present_mode_fifo_latest_ready](VK_KHR_present_mode_fifo_latest_ready.html)`, with the suffix changed to
KHR.
The original type and enum names are still available as aliases of the KHR
names.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDevicePresentModeFifoLatestReadyFeaturesEXT](VkPhysicalDevicePresentModeFifoLatestReadyFeaturesKHR.html)

* 
`VK_EXT_PRESENT_MODE_FIFO_LATEST_READY_EXTENSION_NAME`

* 
`VK_EXT_PRESENT_MODE_FIFO_LATEST_READY_SPEC_VERSION`

* 
Extending [VkPresentModeKHR](VkPresentModeKHR.html):

[VK_PRESENT_MODE_FIFO_LATEST_READY_EXT](VkPresentModeKHR.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PRESENT_MODE_FIFO_LATEST_READY_FEATURES_EXT](VkStructureType.html)

* 
Revision 1, 2024-05-28 (Lionel Duc)

Internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_present_mode_fifo_latest_ready).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
