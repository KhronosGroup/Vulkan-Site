# VkDeviceGroupPresentInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDeviceGroupPresentInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDeviceGroupPresentInfoKHR - Mode and mask controlling which physical devices' images are presented

If the `pNext` chain of [VkPresentInfoKHR](VkPresentInfoKHR.html) includes a
`VkDeviceGroupPresentInfoKHR` structure, then that structure includes an
array of device masks and a device group present mode.

The `VkDeviceGroupPresentInfoKHR` structure is defined as:

// Provided by VK_VERSION_1_1 with VK_KHR_swapchain, VK_KHR_device_group with VK_KHR_swapchain
typedef struct VkDeviceGroupPresentInfoKHR {
    VkStructureType                        sType;
    const void*                            pNext;
    uint32_t                               swapchainCount;
    const uint32_t*                        pDeviceMasks;
    VkDeviceGroupPresentModeFlagBitsKHR    mode;
} VkDeviceGroupPresentInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`swapchainCount` is zero or the number of elements in
`pDeviceMasks`.

* 
`pDeviceMasks` is a pointer to an array of device masks, one for
each element of [VkPresentInfoKHR](VkPresentInfoKHR.html)::`pSwapchains`.

* 
`mode` is a [VkDeviceGroupPresentModeFlagBitsKHR](VkDeviceGroupPresentModeFlagBitsKHR.html) value
specifying the device group present mode that will be used for this
present.

If `mode` is [VK_DEVICE_GROUP_PRESENT_MODE_LOCAL_BIT_KHR](VkDeviceGroupPresentModeFlagBitsKHR.html), then each
element of `pDeviceMasks` selects which instance of the swapchain image
is presented.
Each element of `pDeviceMasks` **must** have exactly one bit set, and the
corresponding physical device **must** have a presentation engine as reported
by [VkDeviceGroupPresentCapabilitiesKHR](VkDeviceGroupPresentCapabilitiesKHR.html).

If `mode` is [VK_DEVICE_GROUP_PRESENT_MODE_REMOTE_BIT_KHR](VkDeviceGroupPresentModeFlagBitsKHR.html), then
each element of `pDeviceMasks` selects which instance of the swapchain
image is presented.
Each element of `pDeviceMasks` **must** have exactly one bit set, and some
physical device in the logical device **must** include that bit in its
[VkDeviceGroupPresentCapabilitiesKHR](VkDeviceGroupPresentCapabilitiesKHR.html)::`presentMask`.

If `mode` is [VK_DEVICE_GROUP_PRESENT_MODE_SUM_BIT_KHR](VkDeviceGroupPresentModeFlagBitsKHR.html), then each
element of `pDeviceMasks` selects which instances of the swapchain image
are component-wise summed and the sum of those images is presented.
If the sum in any component is outside the representable range, the value of
that component is **undefined**.
Each element of `pDeviceMasks` **must** have a value for which all set bits
are set in one of the elements of
[VkDeviceGroupPresentCapabilitiesKHR](VkDeviceGroupPresentCapabilitiesKHR.html)::`presentMask`.

If `mode` is
[VK_DEVICE_GROUP_PRESENT_MODE_LOCAL_MULTI_DEVICE_BIT_KHR](VkDeviceGroupPresentModeFlagBitsKHR.html), then each
element of `pDeviceMasks` selects which instance(s) of the swapchain
images are presented.
For each bit set in each element of `pDeviceMasks`, the corresponding
physical device **must** have a presentation engine as reported by
[VkDeviceGroupPresentCapabilitiesKHR](VkDeviceGroupPresentCapabilitiesKHR.html).

If `VkDeviceGroupPresentInfoKHR` is not provided or `swapchainCount`
is zero then the masks are considered to be `1`.
If `VkDeviceGroupPresentInfoKHR` is not provided, `mode` is
considered to be [VK_DEVICE_GROUP_PRESENT_MODE_LOCAL_BIT_KHR](VkDeviceGroupPresentModeFlagBitsKHR.html).

Valid Usage

* 
[](#VUID-VkDeviceGroupPresentInfoKHR-swapchainCount-01297) VUID-VkDeviceGroupPresentInfoKHR-swapchainCount-01297

`swapchainCount` **must** equal `0` or
[VkPresentInfoKHR](VkPresentInfoKHR.html)::`swapchainCount`

* 
[](#VUID-VkDeviceGroupPresentInfoKHR-mode-01298) VUID-VkDeviceGroupPresentInfoKHR-mode-01298

If `mode` is [VK_DEVICE_GROUP_PRESENT_MODE_LOCAL_BIT_KHR](VkDeviceGroupPresentModeFlagBitsKHR.html), then
each element of `pDeviceMasks` **must** have exactly one bit set, and
the corresponding element of
[VkDeviceGroupPresentCapabilitiesKHR](VkDeviceGroupPresentCapabilitiesKHR.html)::`presentMask` **must** be
non-zero

* 
[](#VUID-VkDeviceGroupPresentInfoKHR-mode-01299) VUID-VkDeviceGroupPresentInfoKHR-mode-01299

If `mode` is [VK_DEVICE_GROUP_PRESENT_MODE_REMOTE_BIT_KHR](VkDeviceGroupPresentModeFlagBitsKHR.html), then
each element of `pDeviceMasks` **must** have exactly one bit set, and
some physical device in the logical device **must** include that bit in its
[VkDeviceGroupPresentCapabilitiesKHR](VkDeviceGroupPresentCapabilitiesKHR.html)::`presentMask`

* 
[](#VUID-VkDeviceGroupPresentInfoKHR-mode-01300) VUID-VkDeviceGroupPresentInfoKHR-mode-01300

If `mode` is [VK_DEVICE_GROUP_PRESENT_MODE_SUM_BIT_KHR](VkDeviceGroupPresentModeFlagBitsKHR.html), then
each element of `pDeviceMasks` **must** have a value for which all set
bits are set in one of the elements of
[VkDeviceGroupPresentCapabilitiesKHR](VkDeviceGroupPresentCapabilitiesKHR.html)::`presentMask`

* 
[](#VUID-VkDeviceGroupPresentInfoKHR-mode-01301) VUID-VkDeviceGroupPresentInfoKHR-mode-01301

If `mode` is
[VK_DEVICE_GROUP_PRESENT_MODE_LOCAL_MULTI_DEVICE_BIT_KHR](VkDeviceGroupPresentModeFlagBitsKHR.html), then for
each bit set in each element of `pDeviceMasks`, the corresponding
element of [VkDeviceGroupPresentCapabilitiesKHR](VkDeviceGroupPresentCapabilitiesKHR.html)::`presentMask`
**must** be non-zero

* 
[](#VUID-VkDeviceGroupPresentInfoKHR-pDeviceMasks-01302) VUID-VkDeviceGroupPresentInfoKHR-pDeviceMasks-01302

The value of each element of `pDeviceMasks` **must** be equal to the
device mask passed in [VkAcquireNextImageInfoKHR](VkAcquireNextImageInfoKHR.html)::`deviceMask`
when the image index was last acquired

* 
[](#VUID-VkDeviceGroupPresentInfoKHR-mode-01303) VUID-VkDeviceGroupPresentInfoKHR-mode-01303

`mode` **must** have exactly one bit set, and that bit **must** have been
included in [VkDeviceGroupSwapchainCreateInfoKHR](VkDeviceGroupSwapchainCreateInfoKHR.html)::`modes`

Valid Usage (Implicit)

* 
[](#VUID-VkDeviceGroupPresentInfoKHR-sType-sType) VUID-VkDeviceGroupPresentInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEVICE_GROUP_PRESENT_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkDeviceGroupPresentInfoKHR-pDeviceMasks-parameter) VUID-VkDeviceGroupPresentInfoKHR-pDeviceMasks-parameter

 If `swapchainCount` is not `0`, `pDeviceMasks` **must** be a valid pointer to an array of `swapchainCount` `uint32_t` values

* 
[](#VUID-VkDeviceGroupPresentInfoKHR-mode-parameter) VUID-VkDeviceGroupPresentInfoKHR-mode-parameter

 `mode` **must** be a valid [VkDeviceGroupPresentModeFlagBitsKHR](VkDeviceGroupPresentModeFlagBitsKHR.html) value

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPresentInfoKHR](VkPresentInfoKHR.html)

[VK_KHR_device_group](VK_KHR_device_group.html), [VK_KHR_swapchain](VK_KHR_swapchain.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkDeviceGroupPresentModeFlagBitsKHR](VkDeviceGroupPresentModeFlagBitsKHR.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkDeviceGroupPresentInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
