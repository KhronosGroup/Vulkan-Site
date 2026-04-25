# VK_NV_external_memory_win32(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_NV_external_memory_win32.html

## Table of Contents

- [Name](#_name)
- [VK_NV_external_memory_win32](#VK_NV_external_memory_win32)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Examples](#_examples)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_NV_external_memory_win32 - device extension

**Name String**

`VK_NV_external_memory_win32`

**Extension Type**

Device extension

**Registered Extension Number**

58

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_NV_external_memory](VK_NV_external_memory.html)

**Deprecation State**

* 
*Deprecated* by
[VK_KHR_external_memory_win32](VK_KHR_external_memory_win32.html)
extension

**Contact**

* 
James Jones [cubanismo](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_NV_external_memory_win32] @cubanismo%0A*Here describe the issue or question you have about the VK_NV_external_memory_win32 extension*)

**Last Modified Date**

2016-08-19

**IP Status**

No known IP claims.

**Contributors**

* 
James Jones, NVIDIA

* 
Carsten Rohde, NVIDIA

Applications may wish to export memory to other Vulkan instances or other
APIs, or import memory from other Vulkan instances or other APIs to enable
Vulkan workloads to be split up across application module, process, or API
boundaries.
This extension enables win32 applications to export win32 handles from
Vulkan memory objects such that the underlying resources can be referenced
outside the Vulkan instance that created them, and import win32 handles
created in the Direct3D API to Vulkan memory objects.

* 
[vkGetMemoryWin32HandleNV](vkGetMemoryWin32HandleNV.html)

* 
Extending [VkMemoryAllocateInfo](VkMemoryAllocateInfo.html):

[VkExportMemoryWin32HandleInfoNV](VkExportMemoryWin32HandleInfoNV.html)

* 
[VkImportMemoryWin32HandleInfoNV](VkImportMemoryWin32HandleInfoNV.html)

* 
`VK_NV_EXTERNAL_MEMORY_WIN32_EXTENSION_NAME`

* 
`VK_NV_EXTERNAL_MEMORY_WIN32_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_EXPORT_MEMORY_WIN32_HANDLE_INFO_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_IMPORT_MEMORY_WIN32_HANDLE_INFO_NV](VkStructureType.html)

1) If memory objects are shared between processes and APIs, is this
considered aliasing according to the rules outlined in the
[Memory Aliasing](../../../../spec/latest/chapters/resources.html#resources-memory-aliasing) section?

**RESOLVED**: Yes, but strict exceptions to the rules are added to allow some
forms of aliasing in these cases.
Further, other extensions may build upon these new aliasing rules to define
specific support usage within Vulkan for imported native memory objects, or
memory objects from other APIs.

2) Are new image layouts or metadata required to specify image layouts and
layout transitions compatible with non-Vulkan APIs, or with other instances
of the same Vulkan driver?

**RESOLVED**: No.
Separate instances of the same Vulkan driver running on the same GPU should
have identical internal layout semantics, so applications have the tools
they need to ensure views of images are consistent between the two
instances.
Other APIs will fall into two categories: Those that are Vulkan compatible
(a term to be defined by subsequent interopability extensions), or Vulkan
incompatible.
When sharing images with Vulkan incompatible APIs, the Vulkan image must be
transitioned to the [VK_IMAGE_LAYOUT_GENERAL](VkImageLayout.html) layout before handing it
off to the external API.

Note this does not attempt to address cross-device transitions, nor
transitions to engines on the same device which are not visible within the
Vulkan API.
Both of these are beyond the scope of this extension.

3) Do applications need to call `CloseHandle`() on the values returned
from [vkGetMemoryWin32HandleNV](vkGetMemoryWin32HandleNV.html) when `handleType` is
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_OPAQUE_WIN32_BIT_NV](VkExternalMemoryHandleTypeFlagBitsNV.html)?

**RESOLVED**: Yes, unless it is passed back in to another driver instance to
import the object.
A successful get call transfers ownership of the handle to the application,
while an import transfers ownership to the associated driver.
Destroying the memory object will not destroy the handle or the handle’s
reference to the underlying memory resource.

    //
    // Create an exportable memory object and export an external
    // handle from it.
    //

    // Pick an external format and handle type.
    static const VkFormat format = VK_FORMAT_R8G8B8A8_UNORM;
    static const VkExternalMemoryHandleTypeFlagsNV handleType =
        VK_EXTERNAL_MEMORY_HANDLE_TYPE_OPAQUE_WIN32_BIT_NV;

    extern VkPhysicalDevice physicalDevice;
    extern VkDevice device;

    VkPhysicalDeviceMemoryProperties memoryProperties;
    VkExternalImageFormatPropertiesNV properties;
    VkExternalMemoryImageCreateInfoNV externalMemoryImageCreateInfo;
    VkDedicatedAllocationImageCreateInfoNV dedicatedImageCreateInfo;
    VkImageCreateInfo imageCreateInfo;
    VkImage image;
    VkMemoryRequirements imageMemoryRequirements;
    uint32_t numMemoryTypes;
    uint32_t memoryType;
    VkExportMemoryAllocateInfoNV exportMemoryAllocateInfo;
    VkDedicatedAllocationMemoryAllocateInfoNV dedicatedAllocationInfo;
    VkMemoryAllocateInfo memoryAllocateInfo;
    VkDeviceMemory memory;
    VkResult result;
    HANDLE memoryHnd;

    // Figure out how many memory types the device supports
    vkGetPhysicalDeviceMemoryProperties(physicalDevice,
                                        &memoryProperties);
    numMemoryTypes = memoryProperties.memoryTypeCount;

    // Check the external handle type capabilities for the chosen format
    // Exportable 2D image support with at least 1 mip level, 1 array
    // layer, and VK_SAMPLE_COUNT_1_BIT using optimal tiling and supporting
    // texturing and color rendering is required.
    result = vkGetPhysicalDeviceExternalImageFormatPropertiesNV(
        physicalDevice,
        format,
        VK_IMAGE_TYPE_2D,
        VK_IMAGE_TILING_OPTIMAL,
        VK_IMAGE_USAGE_SAMPLED_BIT |
        VK_IMAGE_USAGE_COLOR_ATTACHMENT_BIT,
        0,
        handleType,
        &properties);

    if ((result != VK_SUCCESS) ||
        !(properties.externalMemoryFeatures &
          VK_EXTERNAL_MEMORY_FEATURE_EXPORTABLE_BIT_NV)) {
        abort();
    }

    // Set up the external memory image creation info
    memset(&externalMemoryImageCreateInfo,
           0, sizeof(externalMemoryImageCreateInfo));
    externalMemoryImageCreateInfo.sType =
        VK_STRUCTURE_TYPE_EXTERNAL_MEMORY_IMAGE_CREATE_INFO_NV;
    externalMemoryImageCreateInfo.handleTypes = handleType;
    if (properties.externalMemoryFeatures &
        VK_EXTERNAL_MEMORY_FEATURE_DEDICATED_ONLY_BIT_NV) {
        memset(&dedicatedImageCreateInfo, 0, sizeof(dedicatedImageCreateInfo));
        dedicatedImageCreateInfo.sType =
            VK_STRUCTURE_TYPE_DEDICATED_ALLOCATION_IMAGE_CREATE_INFO_NV;
        dedicatedImageCreateInfo.dedicatedAllocation = VK_TRUE;
        externalMemoryImageCreateInfo.pNext = &dedicatedImageCreateInfo;
    }
    // Set up the  core image creation info
    memset(&imageCreateInfo, 0, sizeof(imageCreateInfo));
    imageCreateInfo.sType = VK_STRUCTURE_TYPE_IMAGE_CREATE_INFO;
    imageCreateInfo.pNext = &externalMemoryImageCreateInfo;
    imageCreateInfo.format = format;
    imageCreateInfo.extent.width = 64;
    imageCreateInfo.extent.height = 64;
    imageCreateInfo.extent.depth = 1;
    imageCreateInfo.mipLevels = 1;
    imageCreateInfo.arrayLayers = 1;
    imageCreateInfo.samples = VK_SAMPLE_COUNT_1_BIT;
    imageCreateInfo.tiling = VK_IMAGE_TILING_OPTIMAL;
    imageCreateInfo.usage = VK_IMAGE_USAGE_SAMPLED_BIT |
        VK_IMAGE_USAGE_COLOR_ATTACHMENT_BIT;
    imageCreateInfo.sharingMode = VK_SHARING_MODE_EXCLUSIVE;
    imageCreateInfo.initialLayout = VK_IMAGE_LAYOUT_UNDEFINED;

    vkCreateImage(device, &imageCreateInfo, NULL, &image);

    vkGetImageMemoryRequirements(device,
                                 image,
                                 &imageMemoryRequirements);

    // For simplicity, just pick the first compatible memory type.
    for (memoryType = 0; memoryType 

* 
Revision 1, 2016-08-11 (James Jones)

Initial draft

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_NV_external_memory_win32).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
