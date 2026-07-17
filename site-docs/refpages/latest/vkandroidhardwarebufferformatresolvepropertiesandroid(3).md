# VkAndroidHardwareBufferFormatResolvePropertiesANDROID(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkAndroidHardwareBufferFormatResolvePropertiesANDROID.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkAndroidHardwareBufferFormatResolvePropertiesANDROID - Structure defining properties of resolves using an external format

The [VkAndroidHardwareBufferFormatResolvePropertiesANDROID](#) structure is
defined as:

// Provided by VK_ANDROID_external_format_resolve
typedef struct VkAndroidHardwareBufferFormatResolvePropertiesANDROID {
    VkStructureType    sType;
    void*              pNext;
    VkFormat           colorAttachmentFormat;
} VkAndroidHardwareBufferFormatResolvePropertiesANDROID;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`colorAttachmentFormat` is a [VkFormat](VkFormat.html) specifying the format of
color attachment images that **must** be used for color attachments when
resolving to the specified external format.
If the implementation supports external format resolves for the
specified external format, this value will be a color format supporting
the [VK_FORMAT_FEATURE_COLOR_ATTACHMENT_BIT](VkFormatFeatureFlagBits.html) in
[VkFormatProperties](VkFormatProperties.html)::`optimalTilingFeatures` as returned by
[vkGetPhysicalDeviceFormatProperties](vkGetPhysicalDeviceFormatProperties.html) with `format` equal to
`colorAttachmentFormat` If external format resolves are not
supported, this value will be [VK_FORMAT_UNDEFINED](VkFormat.html).

Any Android hardware buffer created with the `GRALLOC_USAGE_HW_RENDER`
flag **must** be renderable in some way in Vulkan, either:

* 
[VkAndroidHardwareBufferFormatPropertiesANDROID](VkAndroidHardwareBufferFormatPropertiesANDROID.html)::`format` **must**
be a format that supports [VK_FORMAT_FEATURE_COLOR_ATTACHMENT_BIT](VkFormatFeatureFlagBits.html)
or [VK_FORMAT_FEATURE_DEPTH_STENCIL_ATTACHMENT_BIT](VkFormatFeatureFlagBits.html) in
[VkFormatProperties](VkFormatProperties.html)::`optimalTilingFeatures`; or

* 
`colorAttachmentFormat` **must** be a format that supports
[VK_FORMAT_FEATURE_COLOR_ATTACHMENT_BIT](VkFormatFeatureFlagBits.html) in
[VkFormatProperties](VkFormatProperties.html)::`optimalTilingFeatures`.

Valid Usage (Implicit)

* 
[](#VUID-VkAndroidHardwareBufferFormatResolvePropertiesANDROID-sType-sType) VUID-VkAndroidHardwareBufferFormatResolvePropertiesANDROID-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_ANDROID_HARDWARE_BUFFER_FORMAT_RESOLVE_PROPERTIES_ANDROID](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkAndroidHardwareBufferPropertiesANDROID](VkAndroidHardwareBufferPropertiesANDROID.html)

[VK_ANDROID_external_format_resolve](VK_ANDROID_external_format_resolve.html), [VkFormat](VkFormat.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#VkAndroidHardwareBufferFormatResolvePropertiesANDROID).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
