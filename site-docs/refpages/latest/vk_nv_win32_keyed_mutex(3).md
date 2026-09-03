# VK_NV_win32_keyed_mutex(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_NV_win32_keyed_mutex.html

## Table of Contents

- [Name](#_name)
- [VK_NV_win32_keyed_mutex](#VK_NV_win32_keyed_mutex)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Examples](#_examples)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_NV_win32_keyed_mutex - device extension

**Name String**

`VK_NV_win32_keyed_mutex`

**Extension Type**

Device extension

**Registered Extension Number**

59

**Revision**

2

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_NV_external_memory_win32](VK_NV_external_memory_win32.html)

**Deprecation State**

* 
*Promoted* to
[VK_KHR_win32_keyed_mutex](VK_KHR_win32_keyed_mutex.html)
extension

**Contact**

* 
Carsten Rohde [crohde](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_NV_win32_keyed_mutex] @crohde%0A*Here describe the issue or question you have about the VK_NV_win32_keyed_mutex extension*)

**Last Modified Date**

2016-08-19

**IP Status**

No known IP claims.

**Contributors**

* 
James Jones, NVIDIA

* 
Carsten Rohde, NVIDIA

Applications that wish to import Direct3D 11 memory objects into the Vulkan
API may wish to use the native keyed mutex mechanism to synchronize access
to the memory between Vulkan and Direct3D.
This extension provides a way for an application to access the keyed mutex
associated with an imported Vulkan memory object when submitting command
buffers to a queue.

* 
Extending [VkSubmitInfo](VkSubmitInfo.html), [VkSubmitInfo2](VkSubmitInfo2.html):

[VkWin32KeyedMutexAcquireReleaseInfoNV](VkWin32KeyedMutexAcquireReleaseInfoNV.html)

* 
`VK_NV_WIN32_KEYED_MUTEX_EXTENSION_NAME`

* 
`VK_NV_WIN32_KEYED_MUTEX_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_WIN32_KEYED_MUTEX_ACQUIRE_RELEASE_INFO_NV](VkStructureType.html)

    //
    // Import a memory object from Direct3D 11, and synchronize
    // access to it in Vulkan using keyed mutex objects.
    //

    extern VkPhysicalDevice physicalDevice;
    extern VkDevice device;
    extern HANDLE sharedNtHandle;

    static const VkFormat format = VK_FORMAT_R8G8B8A8_UNORM;
    static const VkExternalMemoryHandleTypeFlagsNV handleType =
        VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D11_IMAGE_BIT_NV;

    VkPhysicalDeviceMemoryProperties memoryProperties;
    VkExternalImageFormatPropertiesNV properties;
    VkExternalMemoryImageCreateInfoNV externalMemoryImageCreateInfo;
    VkImageCreateInfo imageCreateInfo;
    VkImage image;
    VkMemoryRequirements imageMemoryRequirements;
    uint32_t numMemoryTypes;
    uint32_t memoryType;
    VkImportMemoryWin32HandleInfoNV importMemoryInfo;
    VkMemoryAllocateInfo memoryAllocateInfo;
    VkDeviceMemory mem;
    VkResult result;

    // Figure out how many memory types the device supports
    vkGetPhysicalDeviceMemoryProperties(physicalDevice,
                                        &memoryProperties);
    numMemoryTypes = memoryProperties.memoryTypeCount;

    // Check the external handle type capabilities for the chosen format
    // Importable 2D image support with at least 1 mip level, 1 array
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
          VK_EXTERNAL_MEMORY_FEATURE_IMPORTABLE_BIT_NV)) {
        abort();
    }

    // Set up the external memory image creation info
    memset(&externalMemoryImageCreateInfo,
           0, sizeof(externalMemoryImageCreateInfo));
    externalMemoryImageCreateInfo.sType =
        VK_STRUCTURE_TYPE_EXTERNAL_MEMORY_IMAGE_CREATE_INFO_NV;
    externalMemoryImageCreateInfo.handleTypes = handleType;
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
Revision 2, 2016-08-11 (James Jones)

Updated sample code based on the NV external memory extensions.

* 
Renamed from NVX to NV extension.

* 
Added Overview and Description sections.

* 
Updated sample code to use the NV external memory extensions.

Revision 1, 2016-06-14 (Carsten Rohde)

* 
Initial draft.

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_NV_win32_keyed_mutex).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
