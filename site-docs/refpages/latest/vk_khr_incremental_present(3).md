# VK_KHR_incremental_present(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_incremental_present.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_incremental_present](#VK_KHR_incremental_present)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_incremental_present - device extension

**Name String**

`VK_KHR_incremental_present`

**Extension Type**

Device extension

**Registered Extension Number**

85

**Revision**

2

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_swapchain](VK_KHR_swapchain.html)

**Contact**

* 
Ian Elliott [ianelliottus](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_incremental_present] @ianelliottus%0A*Here describe the issue or question you have about the VK_KHR_incremental_present extension*)

**Last Modified Date**

2016-11-02

**IP Status**

No known IP claims.

**Contributors**

* 
Ian Elliott, Google

* 
Jesse Hall, Google

* 
Alon Or-bach, Samsung

* 
James Jones, NVIDIA

* 
Daniel Rakos, AMD

* 
Ray Smith, ARM

* 
Mika Isojarvi, Google

* 
Jeff Juliano, NVIDIA

* 
Jeff Bolz, NVIDIA

This device extension extends [vkQueuePresentKHR](vkQueuePresentKHR.html), from the
`[VK_KHR_swapchain](VK_KHR_swapchain.html)` extension, allowing an application to specify a
list of rectangular, modified regions of each image to present.
This should be used in situations where an application is only changing a
small portion of the presentable images within a swapchain, since it enables
the presentation engine to avoid wasting time presenting parts of the
surface that have not changed.

This extension is leveraged from the `EGL_KHR_swap_buffers_with_damage`
extension.

* 
[VkPresentRegionKHR](VkPresentRegionKHR.html)

* 
[VkRectLayerKHR](VkRectLayerKHR.html)

* 
Extending [VkPresentInfoKHR](VkPresentInfoKHR.html):

[VkPresentRegionsKHR](VkPresentRegionsKHR.html)

* 
`VK_KHR_INCREMENTAL_PRESENT_EXTENSION_NAME`

* 
`VK_KHR_INCREMENTAL_PRESENT_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PRESENT_REGIONS_KHR](VkStructureType.html)

1) How should we handle steroescopic-3D swapchains? We need to add a layer
for each rectangle.
One approach is to create another structure containing the [VkRect2D](VkRect2D.html)
plus layer, and have [VkPresentRegionsKHR](VkPresentRegionsKHR.html) point to an array of that
struct.
Another approach is to have two parallel arrays, `pRectangles` and
`pLayers`, where `pRectangles`[i] and `pLayers`[i] must be used
together.
Which approach should we use, and if the array of a new structure, what
should that be called?

**RESOLVED**: Create a new structure, which is a [VkRect2D](VkRect2D.html) plus a layer,
and will be called [VkRectLayerKHR](VkRectLayerKHR.html).

2) Where is the origin of the [VkRectLayerKHR](VkRectLayerKHR.html)?

**RESOLVED**: The upper left corner of the presentable image(s) of the
swapchain, per the definition of framebuffer coordinates.

3) Does the rectangular region, [VkRectLayerKHR](VkRectLayerKHR.html), specify pixels of the
swapchain’s image(s), or of the surface?

**RESOLVED**: Of the image(s).
Some presentation engines may scale the pixels of a swapchain’s image(s) to
the size of the surface.
The size of the swapchain’s image(s) will be consistent, where the size of
the surface may vary over time.

4) What if all of the rectangles for a given swapchain contain a width
and/or height of zero?

**RESOLVED**: The application is indicating that no pixels changed since the
last present.
The presentation engine may use such a hint and not update any pixels for
the swapchain.
However, all other semantics of [vkQueuePresentKHR](vkQueuePresentKHR.html) must still be
honored, including waiting for semaphores to signal.

5) When the swapchain is created with
`VkSwapchainCreateInfoKHR`::`preTransform` set to a value other than
[VK_SURFACE_TRANSFORM_IDENTITY_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html), should the rectangular region,
[VkRectLayerKHR](VkRectLayerKHR.html), be transformed to align with the `preTransform`?

**RESOLVED**: No.
The rectangular region in [VkRectLayerKHR](VkRectLayerKHR.html) should not be transformed.
As such, it may not align with the extents of the swapchain’s image(s).
It is the responsibility of the presentation engine to transform the
rectangular region.
This matches the behavior of the Android presentation engine, which set the
precedent.

* 
Revision 1, 2016-11-02 (Ian Elliott)

Internal revisions

Revision 2, 2021-03-18 (Ian Elliott)

* 
Clarified alignment of rectangles for presentation engines that support
transformed swapchains.

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_incremental_present).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
