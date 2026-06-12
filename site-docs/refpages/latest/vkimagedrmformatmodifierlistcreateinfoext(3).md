# VkImageDrmFormatModifierListCreateInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkImageDrmFormatModifierListCreateInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkImageDrmFormatModifierListCreateInfoEXT - Specify that an image must be created with a DRM format modifier from the provided list

If the `pNext` chain of [VkImageCreateInfo](VkImageCreateInfo.html) includes a
[VkImageDrmFormatModifierListCreateInfoEXT](#) structure, then the image
will be created with one of the [Linux DRM format modifiers](../../../../spec/latest/appendices/glossary.html#glossary-drm-format-modifier) listed in the structure.
The choice of modifier is implementation-dependent.

The [VkImageDrmFormatModifierListCreateInfoEXT](#) structure is defined as:

// Provided by VK_EXT_image_drm_format_modifier
typedef struct VkImageDrmFormatModifierListCreateInfoEXT {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           drmFormatModifierCount;
    const uint64_t*    pDrmFormatModifiers;
} VkImageDrmFormatModifierListCreateInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`drmFormatModifierCount` is the length of the
`pDrmFormatModifiers` array.

* 
`pDrmFormatModifiers` is a pointer to an array of *Linux DRM format
modifiers*.

Valid Usage

* 
[](#VUID-VkImageDrmFormatModifierListCreateInfoEXT-pDrmFormatModifiers-02263) VUID-VkImageDrmFormatModifierListCreateInfoEXT-pDrmFormatModifiers-02263

Each *modifier* in `pDrmFormatModifiers` **must** be compatible with
the parameters in [VkImageCreateInfo](VkImageCreateInfo.html) and its `pNext` chain, as
determined by querying [VkPhysicalDeviceImageFormatInfo2](VkPhysicalDeviceImageFormatInfo2.html) extended
with [VkPhysicalDeviceImageDrmFormatModifierInfoEXT](VkPhysicalDeviceImageDrmFormatModifierInfoEXT.html)

Valid Usage (Implicit)

* 
[](#VUID-VkImageDrmFormatModifierListCreateInfoEXT-sType-sType) VUID-VkImageDrmFormatModifierListCreateInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMAGE_DRM_FORMAT_MODIFIER_LIST_CREATE_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkImageDrmFormatModifierListCreateInfoEXT-pDrmFormatModifiers-parameter) VUID-VkImageDrmFormatModifierListCreateInfoEXT-pDrmFormatModifiers-parameter

 `pDrmFormatModifiers` **must** be a valid pointer to an array of `drmFormatModifierCount` `uint64_t` values

* 
[](#VUID-VkImageDrmFormatModifierListCreateInfoEXT-drmFormatModifierCount-arraylength) VUID-VkImageDrmFormatModifierListCreateInfoEXT-drmFormatModifierCount-arraylength

 `drmFormatModifierCount` **must** be greater than `0`

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkImageCreateInfo](VkImageCreateInfo.html)

[VK_EXT_image_drm_format_modifier](VK_EXT_image_drm_format_modifier.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkImageDrmFormatModifierListCreateInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
