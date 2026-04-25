# VK_EXT_metal_objects

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/VK_EXT_metal_objects.html

## Table of Contents

- [1. Problem Statement](#_problem_statement)
- [1._Problem_Statement](#_problem_statement)
- [2. Solution Space](#_solution_space)
- [2._Solution_Space](#_solution_space)
- [3. Proposal](#_proposal)
- [3.1. Exporting Metal Objects](#_exporting_metal_objects)
- [3.1._Exporting_Metal_Objects](#_exporting_metal_objects)
- [3.2. Importing Metal Objects](#_importing_metal_objects)
- [3.2._Importing_Metal_Objects](#_importing_metal_objects)
- [4. Issues](#_issues)
- [4.1. Should this extension be built by adding Metal platform variations to the VK_KHR_external_memory family of extensions?](#_should_this_extension_be_built_by_adding_metal_platform_variations_to_the_vk_khr_external_memory_family_of_extensions)
- [4.1._Should_this_extension_be_built_by_adding_Metal_platform_variations_to_the_VK_KHR_external_memory_family_of_extensions?](#_should_this_extension_be_built_by_adding_metal_platform_variations_to_the_vk_khr_external_memory_family_of_extensions)
- [4.2. Should this extension be split into two, one for resources and one for other objects?](#_should_this_extension_be_split_into_two_one_for_resources_and_one_for_other_objects)
- [4.2._Should_this_extension_be_split_into_two,_one_for_resources_and_one_for_other_objects?](#_should_this_extension_be_split_into_two_one_for_resources_and_one_for_other_objects)
- [4.3. Should the application be required to indicate its intention to export Metal objects when the corresponding Vulkan object is created?](#_should_the_application_be_required_to_indicate_its_intention_to_export_metal_objects_when_the_corresponding_vulkan_object_is_created)
- [4.3._Should_the_application_be_required_to_indicate_its_intention_to_export_Metal_objects_when_the_corresponding_Vulkan_object_is_created?](#_should_the_application_be_required_to_indicate_its_intention_to_export_metal_objects_when_the_corresponding_vulkan_object_is_created)
- [4.4. Should a MTLBuffer be imported and exported through a VkBuffer or a VkDeviceMemory?](#_should_a_mtlbuffer_be_imported_and_exported_through_a_vkbuffer_or_a_vkdevicememory)
- [4.4._Should_a_MTLBuffer_be_imported_and_exported_through_a_VkBuffer_or_a_VkDeviceMemory?](#_should_a_mtlbuffer_be_imported_and_exported_through_a_vkbuffer_or_a_vkdevicememory)

## Content

Table of Contents

[1. Problem Statement](#_problem_statement)
[2. Solution Space](#_solution_space)
[3. Proposal](#_proposal)

[3.1. Exporting Metal Objects](#_exporting_metal_objects)
[3.2. Importing Metal Objects](#_importing_metal_objects)

[4. Issues](#_issues)

[4.1. Should this extension be built by adding Metal platform variations to the `VK_KHR_external_memory` family of extensions?](#_should_this_extension_be_built_by_adding_metal_platform_variations_to_the_vk_khr_external_memory_family_of_extensions)
[4.2. Should this extension be split into two, one for resources and one for other objects?](#_should_this_extension_be_split_into_two_one_for_resources_and_one_for_other_objects)
[4.3. Should the application be required to indicate its intention to export Metal objects when the corresponding Vulkan object is created?](#_should_the_application_be_required_to_indicate_its_intention_to_export_metal_objects_when_the_corresponding_vulkan_object_is_created)
[4.4. Should a `MTLBuffer` be imported and exported through a `VkBuffer` or a `VkDeviceMemory`?](#_should_a_mtlbuffer_be_imported_and_exported_through_a_vkbuffer_or_a_vkdevicememory)

This document details API design ideas for the `VK_EXT_metal_objects` extension,
which, in a Vulkan implementation that is layered on top of Metal on Apple device
platforms, provides the ability to import and export the underlying Metal objects
associated with specific Vulkan objects.

In a Vulkan implementation that is layered on top of Metal on Apple device platforms,
many Vulkan objects have a corresponding Metal equivalent that provides the underlying
functionality. When integrating a Vulkan application onto such a platform,
it is often useful for the application to be able to interact directly with
these Metal objects:

Pass Metal texture and buffer resources between Vulkan and platform functionality
such as camera, video, AR, or inter-process frameworks.

Create hybrid apps that combine and mingle Vulkan and Metal operations,
by sharing, in addition to Metal texture and buffer resources, also Metal device,
command queues, and synchronization operations.

While the first use case listed above might be addressed via extensions built by adding
Metal platform variations to the `VK_KHR_external_memory` family of extensions, the
second use case requires a different approach. Rather than create a fragmented approach
to managing access to Metal objects, this extension proposes to provide a single unified
interface to all Metal objects providing functionality to the layered Vulkan implementation.
Furthermore, this extension has been designed to be easily extendable, to import and export
new Metal objects that might be introduced in the future.

The intent is that this extension will be advertised and supported only on
implementations that are layered on top of Metal on Apple device platforms.

To export underlying Metal objects from Vulkan objects, this extension adds one new
Vulkan command:

VKAPI_ATTR void VKAPI_CALL vkExportMetalObjectsEXT(
    VkDevice                                    device,
    VkExportMetalObjectsInfoEXT*                pMetalObjectsInfo);

The `pNext` chain of the `VkExportMetalObjectsInfoEXT` in the `pMetalObjectsInfo`
parameter can contain a variety of specialized structures, each targeted to identify
a particular Vulkan object and a pointer through which the underlying Metal object
can be exported, as identified in the following list. The use of `pNext` structures
allows this extension to be flexibly extended in the future to permit access to
additional Metal objects, through the future addition of new export object structures.

typedef struct VkExportMetalObjectsInfoEXT {
    VkStructureType    sType;
    const void*        pNext;
} VkExportMetalObjectsInfoEXT;

typedef struct VkExportMetalDeviceInfoEXT {
    VkStructureType    sType;
    const void*        pNext;
    MTLDevice_id       mtlDevice;
} VkExportMetalDeviceInfoEXT;

typedef struct VkExportMetalCommandQueueInfoEXT {
    VkStructureType       sType;
    const void*           pNext;
    VkQueue               queue;
    MTLCommandQueue_id    mtlCommandQueue;
} VkExportMetalCommandQueueInfoEXT;

typedef struct VkExportMetalBufferInfoEXT {
    VkStructureType    sType;
    const void*        pNext;
    VkDeviceMemory     memory;
    MTLBuffer_id       mtlBuffer;
} VkExportMetalBufferInfoEXT;

typedef struct VkExportMetalTextureInfoEXT {
    VkStructureType          sType;
    const void*              pNext;
    VkImage                  image;
    VkImageView              imageView;
    VkBufferView             bufferView;
    VkImageAspectFlagBits    plane;
    MTLTexture_id            mtlTexture;
} VkExportMetalTextureInfoEXT;

typedef struct VkExportMetalIOSurfaceInfoEXT {
    VkStructureType    sType;
    const void*        pNext;
    VkImage            image;
    IOSurfaceRef       ioSurface;
} VkExportMetalIOSurfaceInfoEXT;

typedef struct VkExportMetalSharedEventInfoEXT {
    VkStructureType      sType;
    const void*          pNext;
    VkSemaphore          semaphore;
    VkEvent              event;
    MTLSharedEvent_id    mtlSharedEvent;
} VkExportMetalSharedEventInfoEXT;

To export Metal objects from Vulkan objects, the application must first indicate the
intention to do so during the creation of the Vulkan object, by including a
`VkExportMetalObjectCreateInfoEXT` structure in the `pNext` chain of the
`VkInstanceCreateInfo`, `VkMemoryAllocateInfo`, `VkImageCreateInfo`,
`VkImageViewCreateInfo`, `VkBufferViewCreateInfo`, `VkSemaphoreCreateInfo`,
or `VkEventCreateInfo`, in the corresponding Vulkan object creation command.

typedef struct VkExportMetalObjectCreateInfoEXT {
    VkStructureType                       sType;
    const void*                           pNext;
    VkExportMetalObjectTypeFlagBitsEXT    exportObjectType;
} VkExportMetalObjectCreateInfoEXT;

typedef enum VkExportMetalObjectTypeFlagBitsEXT {
    VK_EXPORT_METAL_OBJECT_TYPE_METAL_DEVICE_BIT_EXT = 0x00000001,
    VK_EXPORT_METAL_OBJECT_TYPE_METAL_COMMAND_QUEUE_BIT_EXT = 0x00000002,
    VK_EXPORT_METAL_OBJECT_TYPE_METAL_BUFFER_BIT_EXT = 0x00000004,
    VK_EXPORT_METAL_OBJECT_TYPE_METAL_TEXTURE_BIT_EXT = 0x00000008,
    VK_EXPORT_METAL_OBJECT_TYPE_METAL_IOSURFACE_BIT_EXT = 0x00000010,
    VK_EXPORT_METAL_OBJECT_TYPE_METAL_SHARED_EVENT_BIT_EXT = 0x00000020,
    VK_EXPORT_METAL_OBJECT_TYPE_FLAG_BITS_MAX_ENUM_EXT = 0x7FFFFFFF
} VkExportMetalObjectTypeFlagBitsEXT;
typedef VkFlags VkExportMetalObjectTypeFlagsEXT;

A `VkDeviceMemory` object can be created on an existing `MTLBuffer` object, by including
the `MTLBuffer` object in a `VkImportMetalBufferInfoEXT` structure in the `pNext` chain
of the `VkMemoryAllocateInfo` structure in the `vkAllocateMemory` command.

A `VkImage` object can be created on an existing `IOSurface` object, or one or
more existing Metal `MTLTexture` objects, by including those Metal objects in
`VkImportMetalIOSurfaceInfoEXT` or `VkImportMetalTextureInfoEXT` structures in the
`pNext` chain of the `VkImageCreateInfo` structure in the `vkCreateImage` command.

A `VkSemaphore` or `VkEvent` object can be created on an existing `MTLSharedEvent`
object, by including the `MTLSharedEvent` object in a `VkImportMetalSharedEventInfoEXT`
structure in the `pNext` chain of the `VkSemaphoreCreateInfo` or `VkEventCreateInfo`
structure in a `vkCreateSemaphore` or `vkCreateEvent` command, respectively

typedef struct VkImportMetalBufferInfoEXT {
    VkStructureType    sType;
    const void*        pNext;
    MTLBuffer_id       mtlBuffer;
} VkImportMetalBufferInfoEXT;

typedef struct VkImportMetalTextureInfoEXT {
    VkStructureType       sType;
    const void*           pNext;
    VkImageAspectFlags    aspectMask;
    MTLTexture_id         mtlTexture;
} VkImportMetalTextureInfoEXT;

typedef struct VkImportMetalIOSurfaceInfoEXT {
    VkStructureType    sType;
    const void*        pNext;
    IOSurfaceRef       ioSurface;
} VkImportMetalIOSurfaceInfoEXT;

typedef struct VkImportMetalSharedEventInfoEXT {
    VkStructureType      sType;
    const void*          pNext;
    MTLSharedEvent_id    mtlSharedEvent;
} VkImportMetalSharedEventInfoEXT;

No. While the `VK_KHR_external_memory` family of extensions is suitable for resource
objects such as images and buffers, the intent of the `VK_EXT_metal_objects` is to
provide consistent access to a wide variety of Metal objects, including, but not
limited to resource objects.

No. Given the expectation that this extension will be limited to layered implementations
on top of Metal running only on Apple platforms, the preference was for a single simple
extension that served the needs of all expected use cases for apps on those platforms.
Furthermore, the existence of this `VK_EXT_metal_objects` extension does not prevent
additional resource-only extensions compatible with `VK_KHR_external_memory` from being
introduced for those specific use cases, and with the expectation that any resulting
functionality overlap will not cause any issues.

Yes. To improve implementation flexibility and integrity, requiring the application to indicate
the intention to export provides the implementation with the flexibility to optimize
internally if it knows certain Metal objects will or will not be required to be available.

While `MTLBuffer` spans functionality covered by both `VkBuffer` and `VkDeviceMemory`, it
was felt that `MTLBuffer` maps closest to `VkDeviceMemory`, with a `VkBuffer` essentially
being a wrapper object around a segment of that `VkDeviceMemory/MTLBuffer`.
