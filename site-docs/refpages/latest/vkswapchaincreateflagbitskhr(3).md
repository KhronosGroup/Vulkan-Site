# VkSwapchainCreateFlagBitsKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSwapchainCreateFlagBitsKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSwapchainCreateFlagBitsKHR - Bitmask controlling swapchain creation

Bits which **can** be set in [VkSwapchainCreateInfoKHR](VkSwapchainCreateInfoKHR.html)::`flags`,
specifying parameters of swapchain creation, are:

// Provided by VK_KHR_swapchain
typedef enum VkSwapchainCreateFlagBitsKHR {
  // Provided by VK_VERSION_1_1 with VK_KHR_swapchain, VK_KHR_device_group with VK_KHR_swapchain
    VK_SWAPCHAIN_CREATE_SPLIT_INSTANCE_BIND_REGIONS_BIT_KHR = 0x00000001,
  // Provided by VK_VERSION_1_1 with VK_KHR_swapchain
    VK_SWAPCHAIN_CREATE_PROTECTED_BIT_KHR = 0x00000002,
  // Provided by VK_KHR_swapchain_mutable_format
    VK_SWAPCHAIN_CREATE_MUTABLE_FORMAT_BIT_KHR = 0x00000004,
  // Provided by VK_EXT_present_timing
    VK_SWAPCHAIN_CREATE_PRESENT_TIMING_BIT_EXT = 0x00000200,
  // Provided by VK_KHR_present_id2
    VK_SWAPCHAIN_CREATE_PRESENT_ID_2_BIT_KHR = 0x00000040,
  // Provided by VK_KHR_present_wait2
    VK_SWAPCHAIN_CREATE_PRESENT_WAIT_2_BIT_KHR = 0x00000080,
  // Provided by VK_KHR_swapchain_maintenance1
    VK_SWAPCHAIN_CREATE_DEFERRED_MEMORY_ALLOCATION_BIT_KHR = 0x00000008,
  // Provided by VK_EXT_swapchain_maintenance1
    VK_SWAPCHAIN_CREATE_DEFERRED_MEMORY_ALLOCATION_BIT_EXT = VK_SWAPCHAIN_CREATE_DEFERRED_MEMORY_ALLOCATION_BIT_KHR,
} VkSwapchainCreateFlagBitsKHR;

* 
[VK_SWAPCHAIN_CREATE_SPLIT_INSTANCE_BIND_REGIONS_BIT_KHR](#) specifies
that images created from the swapchain (i.e. with the `swapchain`
member of [VkImageSwapchainCreateInfoKHR](VkImageSwapchainCreateInfoKHR.html) set to this swapchain’s
handle) **must** use [VK_IMAGE_CREATE_SPLIT_INSTANCE_BIND_REGIONS_BIT](VkImageCreateFlagBits.html).

* 
[VK_SWAPCHAIN_CREATE_PROTECTED_BIT_KHR](#) specifies that images
created from the swapchain are protected images.

* 
[VK_SWAPCHAIN_CREATE_MUTABLE_FORMAT_BIT_KHR](#) specifies that the
images of the swapchain **can** be used to create a `VkImageView` with
a different format than what the swapchain was created with.
The list of allowed image view formats is specified by adding a
[VkImageFormatListCreateInfo](VkImageFormatListCreateInfo.html) structure to the `pNext` chain of
[VkSwapchainCreateInfoKHR](VkSwapchainCreateInfoKHR.html).
In addition, this flag also specifies that the swapchain **can** be created
with usage flags that are not supported for the format the swapchain is
created with but are supported for at least one of the allowed image
view formats.

* 
[VK_SWAPCHAIN_CREATE_DEFERRED_MEMORY_ALLOCATION_BIT_KHR](#) specifies
    that the implementation **may** defer allocation of memory associated with
    each swapchain image until its index is to be returned from
    [vkAcquireNextImageKHR](vkAcquireNextImageKHR.html)
or [vkAcquireNextImage2KHR](vkAcquireNextImage2KHR.html)
    for the first time.

* 
[VK_SWAPCHAIN_CREATE_PRESENT_ID_2_BIT_KHR](#) specifies that
applications **can** include the `VkPresentId2KHR` structure in the
`pNext` chain of the [VkPresentInfoKHR](VkPresentInfoKHR.html) structure to associate
an identifier with each presentation request.

* 
[VK_SWAPCHAIN_CREATE_PRESENT_WAIT_2_BIT_KHR](#) specifies that
applications **can** use `vkWaitForPresent2KHR` to wait for the
presentation engine to have begun presentation of the presentation
request associated with [VkPresentWait2InfoKHR](VkPresentWait2InfoKHR.html)::`presentId` on
`swapchain`.

* 
[VK_SWAPCHAIN_CREATE_PRESENT_TIMING_BIT_EXT](#) specifies that features
supported by the swapchain device in
[VkPhysicalDevicePresentTimingFeaturesEXT](VkPhysicalDevicePresentTimingFeaturesEXT.html) **can** be used to collect
timing information or schedule presentation requests at specific times.

[VK_KHR_swapchain](VK_KHR_swapchain.html), [VkSwapchainCreateFlagsKHR](VkSwapchainCreateFlagsKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkSwapchainCreateFlagBitsKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
