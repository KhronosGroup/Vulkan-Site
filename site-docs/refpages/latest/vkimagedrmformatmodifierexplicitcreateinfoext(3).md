# VkImageDrmFormatModifierExplicitCreateInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkImageDrmFormatModifierExplicitCreateInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkImageDrmFormatModifierExplicitCreateInfoEXT - Specify that an image be created with the provided DRM format modifier and explicit memory layout

If the `pNext` chain of [VkImageCreateInfo](VkImageCreateInfo.html) includes a
[VkImageDrmFormatModifierExplicitCreateInfoEXT](#) structure, then the
image will be created with the [Linux DRM format modifier](../../../../spec/latest/appendices/glossary.html#glossary-drm-format-modifier) and memory layout defined by the structure.

The [VkImageDrmFormatModifierExplicitCreateInfoEXT](#) structure is defined
as:

// Provided by VK_EXT_image_drm_format_modifier
typedef struct VkImageDrmFormatModifierExplicitCreateInfoEXT {
    VkStructureType               sType;
    const void*                   pNext;
    uint64_t                      drmFormatModifier;
    uint32_t                      drmFormatModifierPlaneCount;
    const VkSubresourceLayout*    pPlaneLayouts;
} VkImageDrmFormatModifierExplicitCreateInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`drmFormatModifier` is the *Linux DRM format modifier* with which
the image will be created.

* 
`drmFormatModifierPlaneCount` is the number of *memory planes* in
the image (as reported by [VkDrmFormatModifierPropertiesEXT](VkDrmFormatModifierPropertiesEXT.html)) as
well as the length of the `pPlaneLayouts` array.

* 
`pPlaneLayouts` is a pointer to an array of
[VkSubresourceLayout](VkSubresourceLayout.html) structures describing the image’s *memory
planes*.

The `i`th member of `pPlaneLayouts` describes the layout of the
image’s `i`th *memory plane* (that is,
`VK_IMAGE_ASPECT_MEMORY_PLANE*_i_*BIT_EXT`).
In each element of `pPlaneLayouts`, the implementation **must** ignore
`size`.
The implementation calculates the size of each plane, which the application
**can** query with [vkGetImageSubresourceLayout](vkGetImageSubresourceLayout.html).

When creating an image with
[VkImageDrmFormatModifierExplicitCreateInfoEXT](#), it is the application’s
responsibility to satisfy all valid usage requirements.
However, the implementation **must** validate that the provided
`pPlaneLayouts`, when combined with the provided `drmFormatModifier`
and other creation parameters in [VkImageCreateInfo](VkImageCreateInfo.html) and its `pNext`
chain, produce a valid image.
(This validation is necessarily implementation-dependent and outside the
scope of Vulkan, and therefore not described by valid usage requirements).
If this validation fails, then [vkCreateImage](vkCreateImage.html) returns
[VK_ERROR_INVALID_DRM_FORMAT_MODIFIER_PLANE_LAYOUT_EXT](VkResult.html).

Valid Usage

* 
[](#VUID-VkImageDrmFormatModifierExplicitCreateInfoEXT-drmFormatModifier-02264) VUID-VkImageDrmFormatModifierExplicitCreateInfoEXT-drmFormatModifier-02264

`drmFormatModifier` **must** be compatible with the parameters in
[VkImageCreateInfo](VkImageCreateInfo.html) and its `pNext` chain, as determined by
querying [VkPhysicalDeviceImageFormatInfo2](VkPhysicalDeviceImageFormatInfo2.html) extended with
[VkPhysicalDeviceImageDrmFormatModifierInfoEXT](VkPhysicalDeviceImageDrmFormatModifierInfoEXT.html)

* 
[](#VUID-VkImageDrmFormatModifierExplicitCreateInfoEXT-drmFormatModifierPlaneCount-02265) VUID-VkImageDrmFormatModifierExplicitCreateInfoEXT-drmFormatModifierPlaneCount-02265

`drmFormatModifierPlaneCount` **must** be equal to the
[VkDrmFormatModifierPropertiesEXT](VkDrmFormatModifierPropertiesEXT.html)::`drmFormatModifierPlaneCount`
associated with [VkImageCreateInfo](VkImageCreateInfo.html)::`format` and
`drmFormatModifier`, as found by querying
[VkDrmFormatModifierPropertiesListEXT](VkDrmFormatModifierPropertiesListEXT.html)

* 
[](#VUID-VkImageDrmFormatModifierExplicitCreateInfoEXT-size-02267) VUID-VkImageDrmFormatModifierExplicitCreateInfoEXT-size-02267

For each element of `pPlaneLayouts`, `size` **must** be 0

* 
[](#VUID-VkImageDrmFormatModifierExplicitCreateInfoEXT-arrayPitch-02268) VUID-VkImageDrmFormatModifierExplicitCreateInfoEXT-arrayPitch-02268

For each element of `pPlaneLayouts`, `arrayPitch` **must** be 0 if
[VkImageCreateInfo](VkImageCreateInfo.html)::`arrayLayers` is 1

* 
[](#VUID-VkImageDrmFormatModifierExplicitCreateInfoEXT-depthPitch-02269) VUID-VkImageDrmFormatModifierExplicitCreateInfoEXT-depthPitch-02269

For each element of `pPlaneLayouts`, `depthPitch` **must** be 0 if
[VkImageCreateInfo](VkImageCreateInfo.html)::`extent.depth` is 1

Valid Usage (Implicit)

* 
[](#VUID-VkImageDrmFormatModifierExplicitCreateInfoEXT-sType-sType) VUID-VkImageDrmFormatModifierExplicitCreateInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMAGE_DRM_FORMAT_MODIFIER_EXPLICIT_CREATE_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkImageDrmFormatModifierExplicitCreateInfoEXT-pPlaneLayouts-parameter) VUID-VkImageDrmFormatModifierExplicitCreateInfoEXT-pPlaneLayouts-parameter

 `pPlaneLayouts` **must** be a valid pointer to an array of `drmFormatModifierPlaneCount` [VkSubresourceLayout](VkSubresourceLayout.html) structures

* 
[](#VUID-VkImageDrmFormatModifierExplicitCreateInfoEXT-drmFormatModifierPlaneCount-arraylength) VUID-VkImageDrmFormatModifierExplicitCreateInfoEXT-drmFormatModifierPlaneCount-arraylength

 `drmFormatModifierPlaneCount` **must** be greater than `0`

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkImageCreateInfo](VkImageCreateInfo.html)

[VK_EXT_image_drm_format_modifier](VK_EXT_image_drm_format_modifier.html), [VkStructureType](VkStructureType.html), [VkSubresourceLayout](VkSubresourceLayout.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkImageDrmFormatModifierExplicitCreateInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
