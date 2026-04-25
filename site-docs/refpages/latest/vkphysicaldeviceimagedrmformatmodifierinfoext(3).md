# VkPhysicalDeviceImageDrmFormatModifierInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceImageDrmFormatModifierInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceImageDrmFormatModifierInfoEXT - Structure specifying a DRM format modifier as image creation parameter

To query the image capabilities that are compatible with a
[Linux DRM format modifier](../../../../spec/latest/appendices/glossary.html#glossary-drm-format-modifier), set
[VkPhysicalDeviceImageFormatInfo2](VkPhysicalDeviceImageFormatInfo2.html)::`tiling` to
[VK_IMAGE_TILING_DRM_FORMAT_MODIFIER_EXT](VkImageTiling.html) and add a
[VkPhysicalDeviceImageDrmFormatModifierInfoEXT](#) structure to the
`pNext` chain of [VkPhysicalDeviceImageFormatInfo2](VkPhysicalDeviceImageFormatInfo2.html).

The [VkPhysicalDeviceImageDrmFormatModifierInfoEXT](#) structure is defined
as:

// Provided by VK_EXT_image_drm_format_modifier
typedef struct VkPhysicalDeviceImageDrmFormatModifierInfoEXT {
    VkStructureType    sType;
    const void*        pNext;
    uint64_t           drmFormatModifier;
    VkSharingMode      sharingMode;
    uint32_t           queueFamilyIndexCount;
    const uint32_t*    pQueueFamilyIndices;
} VkPhysicalDeviceImageDrmFormatModifierInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`drmFormatModifier` is the image’s *Linux DRM format modifier*,
corresponding to
[VkImageDrmFormatModifierExplicitCreateInfoEXT](VkImageDrmFormatModifierExplicitCreateInfoEXT.html)::`drmFormatModifier`
or to
[VkImageDrmFormatModifierListCreateInfoEXT](VkImageDrmFormatModifierListCreateInfoEXT.html)::`pDrmFormatModifiers`.

* 
`sharingMode` specifies how the image will be accessed by multiple
queue families.

* 
`queueFamilyIndexCount` is the number of entries in the
`pQueueFamilyIndices` array.

* 
`pQueueFamilyIndices` is a pointer to an array of queue families
that will access the image.
It is ignored if `sharingMode` is not
[VK_SHARING_MODE_CONCURRENT](VkSharingMode.html).

If the `drmFormatModifier` is incompatible with the parameters specified
in [VkPhysicalDeviceImageFormatInfo2](VkPhysicalDeviceImageFormatInfo2.html) and its `pNext` chain, then
[vkGetPhysicalDeviceImageFormatProperties2](vkGetPhysicalDeviceImageFormatProperties2.html) returns
[VK_ERROR_FORMAT_NOT_SUPPORTED](VkResult.html).
The implementation **must** support the query of any `drmFormatModifier`,
including unknown and invalid modifier values.

Valid Usage

* 
[](#VUID-VkPhysicalDeviceImageDrmFormatModifierInfoEXT-sharingMode-02314) VUID-VkPhysicalDeviceImageDrmFormatModifierInfoEXT-sharingMode-02314

If `sharingMode` is [VK_SHARING_MODE_CONCURRENT](VkSharingMode.html), then
`pQueueFamilyIndices` **must** be a valid pointer to an array of
`queueFamilyIndexCount` `uint32_t` values

* 
[](#VUID-VkPhysicalDeviceImageDrmFormatModifierInfoEXT-sharingMode-02315) VUID-VkPhysicalDeviceImageDrmFormatModifierInfoEXT-sharingMode-02315

If `sharingMode` is [VK_SHARING_MODE_CONCURRENT](VkSharingMode.html), then
`queueFamilyIndexCount` **must** be greater than `1`

* 
[](#VUID-VkPhysicalDeviceImageDrmFormatModifierInfoEXT-sharingMode-02316) VUID-VkPhysicalDeviceImageDrmFormatModifierInfoEXT-sharingMode-02316

If `sharingMode` is [VK_SHARING_MODE_CONCURRENT](VkSharingMode.html), each element
of `pQueueFamilyIndices` **must** be unique and **must** be less than the
`pQueueFamilyPropertyCount` returned by
[vkGetPhysicalDeviceQueueFamilyProperties2](vkGetPhysicalDeviceQueueFamilyProperties2.html) for the
`physicalDevice` that was used to create `device`

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceImageDrmFormatModifierInfoEXT-sType-sType) VUID-VkPhysicalDeviceImageDrmFormatModifierInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_IMAGE_DRM_FORMAT_MODIFIER_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkPhysicalDeviceImageDrmFormatModifierInfoEXT-sharingMode-parameter) VUID-VkPhysicalDeviceImageDrmFormatModifierInfoEXT-sharingMode-parameter

 `sharingMode` **must** be a valid [VkSharingMode](VkSharingMode.html) value

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceImageFormatInfo2](VkPhysicalDeviceImageFormatInfo2.html)

[VK_EXT_image_drm_format_modifier](VK_EXT_image_drm_format_modifier.html), [VkSharingMode](VkSharingMode.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/capabilities.html#VkPhysicalDeviceImageDrmFormatModifierInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
