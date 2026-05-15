# VK_KHR_shared_presentable_image(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_shared_presentable_image.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_shared_presentable_image](#VK_KHR_shared_presentable_image)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_shared_presentable_image - device extension

**Name String**

`VK_KHR_shared_presentable_image`

**Extension Type**

Device extension

**Registered Extension Number**

112

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_swapchain](VK_KHR_swapchain.html)

and

[VK_KHR_get_surface_capabilities2](VK_KHR_get_surface_capabilities2.html)

and

     [VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

     or

     [Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Contact**

* 
Alon Or-bach [alonorbach](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_shared_presentable_image] @alonorbach%0A*Here describe the issue or question you have about the VK_KHR_shared_presentable_image extension*)

**Last Modified Date**

2017-03-20

**IP Status**

No known IP claims.

**Contributors**

* 
Alon Or-bach, Samsung Electronics

* 
Ian Elliott, Google

* 
Jesse Hall, Google

* 
Pablo Ceballos, Google

* 
Chris Forbes, Google

* 
Jeff Juliano, NVIDIA

* 
James Jones, NVIDIA

* 
Daniel Rakos, AMD

* 
Tobias Hector, Imagination Technologies

* 
Graham Connor, Imagination Technologies

* 
Michael Worcester, Imagination Technologies

* 
Cass Everitt, Oculus

* 
Johannes Van Waveren, Oculus

This extension extends `[VK_KHR_swapchain](VK_KHR_swapchain.html)` to enable creation of a
shared presentable image.
This allows the application to use the image while the presention engine is
accessing it, in order to reduce the latency between rendering and
presentation.

* 
[vkGetSwapchainStatusKHR](vkGetSwapchainStatusKHR.html)

* 
Extending [VkSurfaceCapabilities2KHR](VkSurfaceCapabilities2KHR.html):

[VkSharedPresentSurfaceCapabilitiesKHR](VkSharedPresentSurfaceCapabilitiesKHR.html)

* 
`VK_KHR_SHARED_PRESENTABLE_IMAGE_EXTENSION_NAME`

* 
`VK_KHR_SHARED_PRESENTABLE_IMAGE_SPEC_VERSION`

* 
Extending [VkImageLayout](VkImageLayout.html):

[VK_IMAGE_LAYOUT_SHARED_PRESENT_KHR](VkImageLayout.html)

Extending [VkPresentModeKHR](VkPresentModeKHR.html):

* 
[VK_PRESENT_MODE_SHARED_CONTINUOUS_REFRESH_KHR](VkPresentModeKHR.html)

* 
[VK_PRESENT_MODE_SHARED_DEMAND_REFRESH_KHR](VkPresentModeKHR.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_SHARED_PRESENT_SURFACE_CAPABILITIES_KHR](VkStructureType.html)

1) Should we allow a Vulkan WSI swapchain to toggle between normal usage and
shared presentation usage?

**RESOLVED**: No.
WSI swapchains are typically recreated with new properties instead of having
their properties changed.
This can also save resources, assuming that fewer images are needed for
shared presentation, and assuming that most VR applications do not need to
switch between normal and shared usage.

2) Should we have a query for determining how the presentation engine
refresh is triggered?

**RESOLVED**: Yes.
This is done via which presentation modes a surface supports.

3) Should the object representing a shared presentable image be an extension
of a [VkSwapchainKHR](VkSwapchainKHR.html) or a separate object?

**RESOLVED**: Extension of a swapchain due to overlap in creation properties
and to allow common functionality between shared and normal presentable
images and swapchains.

4) What should we call the extension and the new structures it creates?

**RESOLVED**: Shared presentable image / shared present.

5) Should the `minImageCount` and `presentMode` values of the
[VkSwapchainCreateInfoKHR](VkSwapchainCreateInfoKHR.html) be ignored, or required to be compatible
values?

**RESOLVED**: `minImageCount` must be 1, and `presentMode` should be
set to either [VK_PRESENT_MODE_SHARED_DEMAND_REFRESH_KHR](VkPresentModeKHR.html) or
[VK_PRESENT_MODE_SHARED_CONTINUOUS_REFRESH_KHR](VkPresentModeKHR.html).

6) What should the layout of the shared presentable image be?

**RESOLVED**: After acquiring the shared presentable image, the application
must transition it to the [VK_IMAGE_LAYOUT_SHARED_PRESENT_KHR](VkImageLayout.html) layout
prior to it being used.
After this initial transition, any image usage that was requested during
swapchain creation **can** be performed on the image without layout transitions
being performed.

7) Do we need a new API for the trigger to refresh new content?

**RESOLVED**: [vkQueuePresentKHR](vkQueuePresentKHR.html) to act as API to trigger a refresh, as
will allow combination with other compatible extensions to
[vkQueuePresentKHR](vkQueuePresentKHR.html).

8) How should an application detect a [VK_ERROR_OUT_OF_DATE_KHR](VkResult.html) error
on a swapchain using the [VK_PRESENT_MODE_SHARED_CONTINUOUS_REFRESH_KHR](VkPresentModeKHR.html)
present mode?

**RESOLVED**: Introduce [vkGetSwapchainStatusKHR](vkGetSwapchainStatusKHR.html) to allow applications to
query the status of a swapchain using a shared presentation mode.

9) What should subsequent calls to [vkQueuePresentKHR](vkQueuePresentKHR.html) for
[VK_PRESENT_MODE_SHARED_CONTINUOUS_REFRESH_KHR](VkPresentModeKHR.html) swapchains be defined to
do?

**RESOLVED**: State that implementations may use it as a hint for updated
content.

10) Can the ownership of a shared presentable image be transferred to a
different queue?

**RESOLVED**: No.
It is not possible to transfer ownership of a shared presentable image
obtained from a swapchain created using [VK_SHARING_MODE_EXCLUSIVE](VkSharingMode.html)
after it has been presented.

11) How should [vkQueueSubmit](vkQueueSubmit.html) behave if a command buffer uses an image
from a [VK_ERROR_OUT_OF_DATE_KHR](VkResult.html) swapchain?

**RESOLVED**: [vkQueueSubmit](vkQueueSubmit.html) is expected to return the
[VK_ERROR_DEVICE_LOST](VkResult.html) error.

12) Can Vulkan provide any guarantee on the order of rendering, to enable
beam chasing?

**RESOLVED**: This could be achieved via use of render passes to ensure strip
rendering.

* 
Revision 1, 2017-03-20 (Alon Or-bach)

Internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_shared_presentable_image).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
