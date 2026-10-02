# Engine Architecture: Resource Management

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/Building_a_Simple_Engine/Engine_Architecture/04_resource_management.html

## Table of Contents

- [Resource Management](#_resource_management)
- [Resource Management Challenges](#_resource_management_challenges)
- [Resource_Management_Challenges](#_resource_management_challenges)
- [Resource Handles](#_resource_handles)
- [Basic Resource Manager](#_basic_resource_manager)
- [Basic_Resource_Manager](#_basic_resource_manager)
- [Resource Manager: Base Resource Architecture and State Management](#_resource_manager_base_resource_architecture_and_state_management)
- [Resource_Manager:_Base_Resource_Architecture_and_State_Management](#_resource_manager_base_resource_architecture_and_state_management)
- [Resource Manager: Storage Architecture and Type Safety](#_resource_manager_storage_architecture_and_type_safety)
- [Resource_Manager:_Storage_Architecture_and_Type_Safety](#_resource_manager_storage_architecture_and_type_safety)
- [Resource Manager: Resource Loading and Caching Logic](#_resource_manager_resource_loading_and_caching_logic)
- [Resource_Manager:_Resource_Loading_and_Caching_Logic](#_resource_manager_resource_loading_and_caching_logic)
- [Resource Manager: Resource Access and Validation Interface](#_resource_manager_resource_access_and_validation_interface)
- [Resource_Manager:_Resource_Access_and_Validation_Interface](#_resource_manager_resource_access_and_validation_interface)
- [Resource Manager: Reference Counting and Automatic Cleanup](#_resource_manager_reference_counting_and_automatic_cleanup)
- [Resource_Manager:_Reference_Counting_and_Automatic_Cleanup](#_resource_manager_reference_counting_and_automatic_cleanup)
- [Implementing Specific Resource Types](#_implementing_specific_resource_types)
- [Implementing_Specific_Resource_Types](#_implementing_specific_resource_types)
- [Texture Resource Implementation](#_texture_resource_implementation)
- [Texture_Resource_Implementation](#_texture_resource_implementation)
- [Texture Resource: Resource Structure and Vulkan State Management](#_texture_resource_resource_structure_and_vulkan_state_management)
- [Texture_Resource:_Resource_Structure_and_Vulkan_State_Management](#_texture_resource_resource_structure_and_vulkan_state_management)
- [Texture Resource: Loading Pipeline and Data Acquisition](#_texture_resource_loading_pipeline_and_data_acquisition)
- [Texture_Resource:_Loading_Pipeline_and_Data_Acquisition](#_texture_resource_loading_pipeline_and_data_acquisition)
- [Texture Resource: GPU Resource Cleanup and Memory Management](#_texture_resource_gpu_resource_cleanup_and_memory_management)
- [Texture_Resource:_GPU_Resource_Cleanup_and_Memory_Management](#_texture_resource_gpu_resource_cleanup_and_memory_management)
- [Texture Resource: Helper Methods and Implementation Details](#_texture_resource_helper_methods_and_implementation_details)
- [Texture_Resource:_Helper_Methods_and_Implementation_Details](#_texture_resource_helper_methods_and_implementation_details)
- [Mesh Resource Implementation](#_mesh_resource_implementation)
- [Mesh_Resource_Implementation](#_mesh_resource_implementation)
- [Mesh Resource: Geometric Data Structure and Buffer Management](#_mesh_resource_geometric_data_structure_and_buffer_management)
- [Mesh_Resource:_Geometric_Data_Structure_and_Buffer_Management](#_mesh_resource_geometric_data_structure_and_buffer_management)
- [Mesh Resource: Data Loading and Format Processing Pipeline](#_mesh_resource_data_loading_and_format_processing_pipeline)
- [Mesh_Resource:_Data_Loading_and_Format_Processing_Pipeline](#_mesh_resource_data_loading_and_format_processing_pipeline)
- [Mesh Resource: GPU Resource Cleanup and Memory Reclamation](#_mesh_resource_gpu_resource_cleanup_and_memory_reclamation)
- [Mesh_Resource:_GPU_Resource_Cleanup_and_Memory_Reclamation](#_mesh_resource_gpu_resource_cleanup_and_memory_reclamation)
- [Mesh Resource: Helper Methods and Implementation Support Infrastructure](#_mesh_resource_helper_methods_and_implementation_support_infrastructure)
- [Mesh_Resource:_Helper_Methods_and_Implementation_Support_Infrastructure](#_mesh_resource_helper_methods_and_implementation_support_infrastructure)
- [Shader Resource Implementation](#_shader_resource_implementation)
- [Shader_Resource_Implementation](#_shader_resource_implementation)
- [Using the Resource Manager](#_using_the_resource_manager)
- [Using_the_Resource_Manager](#_using_the_resource_manager)
- [Advanced Resource Management Techniques](#_advanced_resource_management_techniques)
- [Advanced_Resource_Management_Techniques](#_advanced_resource_management_techniques)
- [Asynchronous Loading](#_asynchronous_loading)
- [Resource Streaming](#_resource_streaming)
- [Hot Reloading](#_hot_reloading)
- [Conclusion](#_conclusion)

## Content

Efficient resource management is a critical aspect of any rendering engine. In this section, we’ll explore strategies for managing various types of resources, such as textures, meshes, shaders, and materials.

When designing a resource management system, you’ll need to address several challenges:

**Loading and Unloading** - Resources need to be loaded from disk and unloaded when no longer needed.

**Caching** - Frequently used resources should be cached to avoid redundant loading.

**Reference Counting** - Track how many objects are using a resource to know when it can be safely unloaded.

**Hot Reloading** - Allow resources to be updated while the application is running (useful during development).

**Streaming** - Load resources asynchronously to avoid blocking the main thread. It’s good to realize that "streaming" here is meant in terms of sending data from one location to another in chunks.  It’s the same type of algorithm that might be familiar in networking or internet downloading, however, it only differs in the sense that it relates to transferring data between the system memory and the GPU memory.

**Memory Management** - Efficiently allocate and deallocate memory for resources.

Instead of directly exposing resource pointers, it’s often better to use resource handles:

// Resource handle
template
class ResourceHandle {
private:
    std::string resourceId;
    ResourceManager* resourceManager;

public:
    ResourceHandle() : resourceManager(nullptr) {}

    ResourceHandle(const std::string& id, ResourceManager* manager)
        : resourceId(id), resourceManager(manager) {}

    T* Get() const {
        if (!resourceManager) return nullptr;
        return resourceManager->GetResource(resourceId);
    }

    bool IsValid() const {
        return resourceManager && resourceManager->HasResource(resourceId);
    }

    const std::string& GetId() const {
        return resourceId;
    }

    // Convenience operators
    T* operator->() const {
        return Get();
    }

    T& operator*() const {
        return *Get();
    }

    operator bool() const {
        return IsValid();
    }
};

Using handles instead of direct pointers provides several benefits:

**Indirection** - The resource manager can move resources in memory without invalidating references.

**Validation** - Handles can be checked for validity before use.

**Automatic Resource Management** - The resource manager can track which resources are in use.

Let’s implement a basic resource manager that can handle different types of resources. This implementation involves several key steps that work together to provide efficient resource management for a rendering engine.

First, we establish the fundamental infrastructure for resource management, defining how resources track their identity and loading state within the system.

// Resource base class
class Resource {
private:
    std::string resourceId;     // Unique identifier for this resource within the system
    bool loaded = false;        // Loading state flag for resource lifecycle management

public:
    explicit Resource(const std::string& id) : resourceId(id) {}
    virtual ~Resource() = default;

    // Core resource identity and state access methods
    const std::string& GetId() const { return resourceId; }
    bool IsLoaded() const { return loaded; }

    // Virtual interface for resource-specific loading and unloading behavior
    bool Load() {
        loaded = doLoad();
        return loaded;
    }

    void Unload() {
        doUnload();
        loaded = false;
    }

    protected:
        virtual bool doLoad() = 0;
        virtual bool doUnload() = 0;
};

The Resource base class provides the foundational contract that all resource types must fulfill. The resource ID serves as a unique identifier that allows the resource manager to locate and reference specific resources without ambiguity. This string-based approach enables human-readable resource names like "main_character_texture" or "level_1_audio" while maintaining the flexibility to use file paths or other naming schemes.

The loading state management through the boolean flag provides essential lifecycle tracking. This simple approach allows systems to quickly determine whether a resource is ready for use without expensive validation checks. The virtual loading interface enables polymorphic behavior where different resource types can implement their own specialized loading logic while presenting a consistent interface to the management system.

Next, we implement the core storage system that organizes resources by type while maintaining type safety and efficient access patterns.

// Resource manager
class ResourceManager {
private:
    // Two-level storage system: organize by type first, then by unique identifier
    // This approach enables type-safe resource access while maintaining efficient lookup
    std::unordered_map>> resources;

    // Two-level reference counting system for automatic resource lifecycle management
    // First level maps resource type, second level maps resource IDs to their data
    struct ResourceData {
        std::shared_ptr resource;  // The actual resource
        int refCount;                        // Reference count for this resource
    };
    std::unordered_map> refCounts;

The storage architecture uses a sophisticated two-level mapping system that solves several critical problems in resource management. The outer map keyed by `std::type_index` ensures complete type separation, preventing name collisions between different resource types. For example, you could have both a texture named "stone" and a sound effect named "stone" without conflicts, as they’re stored in separate type-specific containers.

The inner maps provide O(1) average-case lookup performance for individual resources, which is crucial when the rendering system needs to access hundreds or thousands of resources per frame. The use of `std::shared_ptr` provides automatic memory management and enables safe sharing of resources between different systems without manual lifetime management.

The reference counting system operates independently of the shared_ptr reference counting to provide application-level lifecycle control. This separation allows the resource manager to implement custom policies for resource retention and cleanup that go beyond simple memory management, such as keeping frequently used resources loaded even when not immediately referenced.

Then, we implement the intelligent resource loading system that handles caching, reference counting, and error recovery for efficient resource management.

public:
    template
    ResourceHandle Load(const std::string& resourceId) {
        static_assert(std::is_base_of::value, "T must derive from Resource");

        // Step 3a: Check existing resource cache to avoid redundant loading
        auto& typeResources = resources[std::type_index(typeid(T))];
        auto it = typeResources.find(resourceId);

        if (it != typeResources.end()) {
            // Resource exists in cache - increment reference count and return handle
            refCounts[resourceId]++;
            return ResourceHandle(resourceId, this);
        }

        // Step 3b: Create new resource instance and attempt loading
        auto resource = std::make_shared(resourceId);
        if (!resource->Load()) {
            // Loading failed - return invalid handle rather than corrupting cache
            return ResourceHandle();
        }

        // Step 3c: Cache successful resource and initialize reference tracking
        typeResources[resourceId] = resource;
        refCounts[resourceId] = 1;

        return ResourceHandle(resourceId, this);
    }

The loading logic implements a sophisticated caching strategy that balances performance with memory efficiency. The cache-first approach prevents redundant I/O operations and resource processing, which can be expensive for large textures, complex meshes, or compiled shaders. This strategy is particularly important in rendering engines where the same resources may be referenced by multiple objects or systems.

The template-based design with compile-time type checking ensures type safety while maintaining the flexibility to work with any resource type that derives from the base Resource class. The static assertion provides clear error messages during development, preventing runtime type errors that could be difficult to debug in complex rendering scenarios.

Error handling follows the principle of graceful degradation, where loading failures return invalid handles rather than throwing exceptions or corrupting the resource cache. This approach allows rendering systems to continue operating with fallback resources or alternative rendering paths when specific assets are unavailable or corrupted.

After that, we provide the interface for safely accessing cached resources with proper validation and type checking throughout the resource lifecycle.

    template
    T* GetResource(const std::string& resourceId) {
        // Access type-specific resource container using compile-time type information
        auto& typeResources = resources[std::type_index(typeid(T))];
        auto it = typeResources.find(resourceId);

        if (it != typeResources.end()) {
            // Resource found - perform safe downcast and return typed pointer
            return static_cast(it->second.get());
        }

        // Resource not found - return null for safe handling by caller
        return nullptr;
    }

    template
    bool HasResource(const std::string& resourceId) {
        // Efficient existence check without resource access overhead
        auto resourceIt = resources.find(std::type_index(typeid(T)));
        return resourceIt != resources.end();
    }

The resource access interface prioritizes safety and performance in equal measure. The template-based approach ensures that clients always receive correctly typed resource pointers, eliminating the need for manual casting and reducing the potential for type-related runtime errors. The static_cast is safe because the type_index-based storage guarantees that only objects of type T are stored in each type-specific container.

The existence check provides an efficient way to validate resource availability without the overhead of full resource access. This capability is valuable for conditional rendering logic, where systems can choose alternative rendering paths based on resource availability without triggering expensive cache misses or I/O operations.

Finally, we implement intelligent resource lifecycle management through reference counting and automatic cleanup to prevent memory leaks and optimize resource utilization.

    void Release(const std::string& resourceId) {
        // Locate reference count entry for this resource
        auto it = refCounts.find(resourceId);
        if (it != refCounts.end()) {
            it->second--;

            // Check if resource has no remaining references
            if (it->second second->Unload();      // Allow resource to clean up its data
                        typeResources.erase(resourceIt);   // Remove from cache
                        break;
                    }
                }

                // Step 5b: Clean up reference counting entry
                refCounts.erase(it);
            }
        }
    }

    void UnloadAll() {
        // Emergency cleanup method for system shutdown or major state changes
        for (auto& [type, typeResources] : resources) {
            for (auto& [id, resource] : typeResources) {
                resource->Unload();     // Ensure all resources clean up properly
            }
            typeResources.clear();      // Clear type-specific containers
        }
        refCounts.clear();              // Reset all reference counts
    }
};

The reference counting system provides automatic garbage collection for resources that are no longer actively used. This approach prevents memory leaks while avoiding the overhead of constantly monitoring resource usage across the entire application. The decrement-and-check pattern ensures that resources are unloaded immediately when they become unused, helping to keep memory usage optimal.

The cleanup process is designed to be thorough and safe, ensuring that resources have the opportunity to properly release their internal data (GPU memory, file handles, etc.) before being removed from the cache. This two-phase cleanup approach prevents resource leaks and maintains system stability even under error conditions.

The global unload functionality provides a safety valve for major state transitions like level changes or application shutdown, where you want to ensure all resources are properly cleaned up regardless of their reference counts. This capability is essential for preventing resource leaks that could accumulate over long application runs.

Now let’s implement some specific resource types that demonstrate how different asset types can be integrated into our resource management system. These implementations showcase the flexibility of the base Resource interface while addressing the unique requirements of different content types.

The Texture resource represents one of the most complex resource types in a rendering engine, requiring careful management of GPU memory, format conversion, and sampling parameters. Let’s break this implementation into logical phases that demonstrate both the technical challenges and design solutions.

First, we establish the fundamental data structures required for Vulkan texture management, including GPU resources and metadata needed for proper texture usage.

// Texture resource
class Texture : public Resource {
private:
    // Core Vulkan GPU resources for texture representation
    vk::Image image;              // GPU image object containing pixel data
    vk::DeviceMemory memory;      // GPU memory allocation backing the image
    vk::DeviceSize offset;        // Offset within the memory allocation for this texture
    vk::ImageView imageView;      // Shader-accessible view into the image
    vk::Sampler sampler;          // Sampling configuration (filtering, wrapping, etc.)

    // Texture metadata for validation and debugging
    int width = 0;                // Image width in pixels
    int height = 0;               // Image height in pixels
    int channels = 0;             // Number of color channels (RGB=3, RGBA=4, etc.)

public:
    explicit Texture(const std::string& id) : Resource(id) {}

    ~Texture() override {
        Unload();                 // Ensure proper cleanup when object is destroyed
    }

The Vulkan texture pipeline requires four distinct GPU objects that work together to provide complete texture functionality. The `vk::Image` represents the actual pixel data storage on the GPU, while `vk::DeviceMemory` provides the backing memory allocation. The separation between image and memory allows for advanced memory management techniques like suballocation and memory pooling.

The `vk::ImageView` serves as the interface between shaders and the image data, defining how shaders interpret the pixel format, mipmap levels, and array layers. The `vk::Sampler` encapsulates filtering and addressing modes that control how the GPU interpolates between pixels and handles texture coordinates outside the [0,1] range. This separation of concerns allows the same image to be used with different sampling configurations simultaneously.

Next, we implement the texture loading pipeline that transforms disk-based image files into GPU-ready resources through careful error handling and format conversion.

    bool Load() override {
        // Step 2a: Construct file path using resource ID and expected format
        std::string filePath = "textures/" + GetId() + ".ktx";

        // Step 2b: Load raw image data from disk with format detection
        unsigned char* data = LoadImageData(filePath, &width, &height, &channels);
        if (!data) {
            return false;           // Failed to load - return failure without partial state
        }

        // Step 2c: Transform raw pixel data into Vulkan GPU resources
        CreateVulkanImage(data, width, height, channels);

        // Step 2d: Clean up temporary CPU memory to prevent leaks
        FreeImageData(data);

        return Resource::Load();    // Mark resource as successfully loaded
    }

The loading pipeline follows a clear sequence that handles the complex transformation from file-based data to GPU resources. The file path construction assumes a standard naming convention that maps resource IDs to physical files, enabling consistent asset organization across the project. Using the KTX format provides several advantages including GPU-native format storage, mipmap support, and compression compatibility.

Error handling at each stage prevents partial loading states that could leave the resource in an inconsistent condition. If image data loading fails, the function returns immediately without creating GPU resources, ensuring that the Texture object remains in a clean, unloaded state. This approach prevents resource leaks and makes error recovery more predictable for calling code.

The temporary nature of the CPU-side image data reflects the typical texture loading workflow where pixel data is needed only long enough to upload to the GPU. Once the GPU resources are created and populated, the CPU copy can be safely discarded, reducing memory pressure and preventing unnecessary data duplication.

Then, we implement comprehensive resource cleanup that ensures all GPU resources are properly released when the texture is no longer needed, preventing memory leaks in long-running applications.  Please note that if you have vk::raii objects, the destructor of the vk::raii objects will automatically handle the cleanup of the GPU resources.  If, however, you have a vk::Device object, you must manually destroy the GPU resources to prevent memory leaks.  Additionally, you need to have initialized the defaultDispatcher for the vk::Device object types.  In the event that you are using vk::Device objects, the Unload function below details explicit releasing of the objects.

    void Unload() override {
        // Only perform cleanup if resource is currently loaded
        if (IsLoaded()) {
            // Step 3a: Obtain device handle for resource destruction
            vk::Device device = GetDevice();

            // Step 3b: Destroy GPU objects in reverse creation order
            // This ordering prevents use-after-free errors in GPU drivers
            device.destroySampler(sampler);       // Destroy sampling configuration
            device.destroyImageView(imageView);   // Destroy shader view
            device.destroyImage(image);           // Destroy image object
            device.freeMemory(memory);            // Release GPU memory allocation

            // Step 3c: Update base class state to reflect unloaded status
            Resource::Unload();
        }
    }

    // Public interface for accessing Vulkan resources safely
    vk::Image GetImage() const { return image; }
    vk::ImageView GetImageView() const { return imageView; }
    vk::Sampler GetSampler() const { return sampler; }

The cleanup sequence follows Vulkan’s object dependency requirements, where objects must be destroyed in reverse order of their creation to avoid validation errors and potential driver crashes. The sampler and image view depend on the image, so they must be destroyed first. The memory allocation is released last since it backs the image object.

The conditional cleanup check prevents double-destruction errors that could occur if Unload() is called multiple times. This safety mechanism is particularly important in resource management systems where multiple code paths might trigger cleanup operations during error handling or shutdown sequences.

The public getter interface provides controlled access to the internal Vulkan resources without exposing the implementation details or allowing external code to modify the resource state. This encapsulation ensures that the Texture object maintains complete control over its GPU resources throughout their lifetime.

Finally, we provide the supporting infrastructure methods that handle the platform-specific details of image loading and Vulkan resource creation.

private:
    unsigned char* LoadImageData(const std::string& filePath, int* width, int* height, int* channels) {
        // Implementation using stb_image or ktx library
        // This method abstracts the details of different image format support
        // and provides a consistent interface for pixel data loading
        // ...
        return nullptr; // Placeholder
    }

    void FreeImageData(unsigned char* data) {
        // Implementation using stb_image or ktx library
        // Ensures proper cleanup of image loader specific memory allocations
        // Different libraries may require different cleanup approaches
        // ...
    }

    void CreateVulkanImage(unsigned char* data, int width, int height, int channels) {
        // Implementation to create Vulkan image, allocate memory, and upload data
        // This involves complex Vulkan operations including:
        // - Format selection based on channel count and data type
        // - Memory allocation with appropriate usage flags
        // - Image creation with optimal tiling and layout
        // - Data upload via staging buffers for efficiency
        // - Image view creation for shader access
        // - Sampler creation with appropriate filtering settings
        // ...
    }

    vk::Device GetDevice() {
        // Get device from somewhere (e.g., singleton or parameter)
        // Production code would use dependency injection or service location
        // to provide the Vulkan device handle without tight coupling
        // ...
        return vk::Device(); // Placeholder
    }
};

The helper methods abstract away the platform-specific and library-specific details of texture loading and GPU resource creation. The `LoadImageData` method encapsulates support for different image formats and loading libraries, providing a consistent interface regardless of whether you’re using STB Image, DevIL, FreeImage, or other image loading solutions.

The `CreateVulkanImage` method represents one of the most complex operations in texture management, involving multiple Vulkan API calls with careful attention to format selection, memory alignment, and performance optimization. Production implementations typically use staging buffers for efficient data transfer and may include mipmap generation, format conversion, and compression support.

The device access pattern shown here as a placeholder represents a common design challenge in resource management systems: how to provide access to core engine services without creating tight coupling. Production systems typically use dependency injection, service locators, or context objects to provide access to the Vulkan device and other core resources.

The Mesh resource represents the geometric foundation of 3D rendering, managing vertex and index data that define the shape and structure of 3D objects. This implementation demonstrates how to efficiently manage GPU buffer resources for geometric data.

First, we establish the fundamental data structures required for storing and managing geometric data on the GPU, including both vertex attributes and index connectivity information.

// Mesh resource
class Mesh : public Resource {
private:
    // Vertex data management - stores per-vertex attributes like position, normal, UV coordinates
    vk::Buffer vertexBuffer;                // GPU buffer containing vertex attribute data
    vk::DeviceMemory vertexBufferMemory;    // GPU memory backing the vertex buffer
    vk::DeviceSize vertexBufferOffset;      // Offset within the memory allocation for vertex buffer
    uint32_t vertexCount = 0;               // Number of vertices in this mesh

    // Index data management - defines triangle connectivity using vertex indices
    vk::Buffer indexBuffer;                 // GPU buffer containing triangle index data
    vk::DeviceMemory indexBufferMemory;     // GPU memory backing the index buffer
    vk::DeviceSize indexBufferOffset;       // Offset within the memory allocation for index buffer
    uint32_t indexCount = 0;                // Number of indices in this mesh (typically 3 per triangle)

public:
    explicit Mesh(const std::string& id) : Resource(id) {}

    ~Mesh() override {
        Unload();                           // Ensure GPU resources are cleaned up
    }

The mesh resource architecture separates vertex and index data into distinct GPU buffers, following modern graphics API best practices. Vertex buffers contain per-vertex attributes such as positions, normals, texture coordinates, and color information, while index buffers define how vertices connect to form triangles. This separation enables efficient vertex reuse, where a single vertex can be referenced by multiple triangles, significantly reducing memory usage for typical 3D models.

The buffer-memory pairing reflects Vulkan’s explicit memory management model, where buffer objects and their backing memory allocations are managed separately. This approach provides fine-grained control over memory allocation strategies, enabling techniques like memory pooling, suballocation, and custom alignment requirements that can significantly impact rendering performance.

The count tracking serves dual purposes: it provides essential information for rendering calls that specify how many vertices or indices to process, and it enables validation and debugging by allowing systems to verify that buffer contents match expected data sizes.

Next, we implement the mesh loading pipeline that transforms file-based geometric data into GPU-ready buffer resources through format parsing and data validation.

    bool Load() override {
        // Step 2a: Construct file path using standardized naming convention
        std::string filePath = "models/" + GetId() + ".gltf";

        // Step 2b: Parse geometric data from file format into CPU-accessible structures
        std::vector vertices;      // Temporary CPU storage for vertex attributes
        std::vector indices;     // Temporary CPU storage for triangle indices
        if (!LoadMeshData(filePath, vertices, indices)) {
            return false;                   // Failed to parse file - abort loading
        }

        // Step 2c: Transform CPU data into optimized GPU buffer resources
        CreateVertexBuffer(vertices);       // Upload vertex attributes to GPU
        CreateIndexBuffer(indices);         // Upload triangle connectivity to GPU

        // Step 2d: Cache metadata for efficient rendering operations
        vertexCount = static_cast(vertices.size());
        indexCount = static_cast(indices.size());

        return Resource::Load();            // Mark resource as successfully loaded
    }

The loading pipeline follows a structured approach that separates file parsing from GPU resource creation, enabling better error handling and code reusability. The choice of glTF format provides several advantages including industry-standard mesh representation, embedded material information, and support for advanced features like skeletal animations and morph targets.

The temporary CPU-side storage approach enables validation and processing of geometric data before committing to GPU resources. This intermediate step allows for mesh optimization techniques such as vertex cache optimization, triangle strip generation, or level-of-detail processing that can significantly improve rendering performance.

The metadata caching strategy stores frequently accessed information locally to avoid expensive GPU queries during rendering. These counts are essential for draw calls, where the GPU needs to know exactly how many vertices to process and how many triangles to render, making local storage much more efficient than querying the GPU buffers repeatedly.

Then, we implement comprehensive cleanup that properly releases all GPU resources and memory allocations when the mesh is no longer needed, ensuring robust memory management in long-running applications.  As mentioned above, if you have vk::raii objects, the destructor of the vk::raii objects will automatically handle the cleanup of the GPU resources.  If, however, you have a vk::Device object, you must manually destroy the GPU resources to prevent memory leaks.  Additionally, you need to have initialized the defaultDispatcher for the vk::Device object types.  In the event that you are using vk::Device objects, the Unload function below details explicit releasing of the objects.

    void Unload() override {
        // Only proceed with cleanup if resources are currently loaded
        if (IsLoaded()) {
            // Phase 3a: Obtain device handle for resource destruction
            vk::Device device = GetDevice();

            // Phase 3b: Destroy buffers and free GPU memory in proper sequence
            // Index resources cleaned up first to maintain clear dependency order
            device.destroyBuffer(indexBuffer);         // Destroy index buffer object
            device.freeMemory(indexBufferMemory);      // Release index buffer memory

            // Vertex resources cleaned up second
            device.destroyBuffer(vertexBuffer);        // Destroy vertex buffer object
            device.freeMemory(vertexBufferMemory);     // Release vertex buffer memory

            // Phase 3c: Update base class state to reflect unloaded condition
            Resource::Unload();
        }
    }

    // Public interface for safe access to GPU resources and metadata
    vk::Buffer GetVertexBuffer() const { return vertexBuffer; }
    vk::Buffer GetIndexBuffer() const { return indexBuffer; }
    uint32_t GetVertexCount() const { return vertexCount; }
    uint32_t GetIndexCount() const { return indexCount; }

The cleanup sequence ensures that GPU resources are properly released without causing validation errors or driver instability. While Vulkan doesn’t impose strict ordering requirements for buffer destruction, following a consistent pattern (index resources before vertex resources) makes the code more predictable and easier to debug when issues arise.

The conditional cleanup check prevents double-destruction scenarios that could occur during error handling or when multiple systems attempt to clean up resources simultaneously. This safety mechanism is particularly important in complex rendering systems where resource ownership might be shared between multiple components.

The public access interface provides controlled access to internal GPU resources while maintaining encapsulation. These getter methods enable rendering systems to bind the appropriate buffers for draw operations while preventing external code from accidentally modifying the mesh’s internal state or triggering premature resource destruction.

The final phase provides the supporting methods that handle the complex details of mesh data parsing, buffer creation, and system integration required for complete mesh resource functionality.

private:
    bool LoadMeshData(const std::string& filePath, std::vector& vertices, std::vector& indices) {
        // Implementation using tinygltf or similar library
        // This method handles the complex task of:
        // - Opening and validating the mesh file format
        // - Parsing vertex attributes (positions, normals, UVs, etc.)
        // - Extracting index data that defines triangle connectivity
        // - Converting from file format to engine-specific vertex structures
        // - Performing validation to ensure data integrity
        // ...
        return true; // Placeholder
    }

    void CreateVertexBuffer(const std::vector& vertices) {
        // Implementation to create Vulkan buffer, allocate memory, and upload data
        // This involves several complex Vulkan operations:
        // - Calculating buffer size requirements based on vertex count and structure
        // - Creating buffer with appropriate usage flags (vertex buffer usage)
        // - Allocating GPU memory with optimal memory type selection
        // - Uploading data via staging buffer for efficient transfer
        // - Setting up memory barriers to ensure data availability
        // ...
    }

    void CreateIndexBuffer(const std::vector& indices) {
        // Implementation to create Vulkan buffer, allocate memory, and upload data
        // Similar to vertex buffer creation but optimized for index data:
        // - Buffer creation with index buffer specific usage flags
        // - Memory allocation optimized for read-heavy access patterns
        // - Efficient data transfer using appropriate staging mechanisms
        // - Index format validation (16-bit vs 32-bit indices)
        // ...
    }

    vk::Device GetDevice() {
        // Get device from somewhere (e.g., singleton or parameter)
        // Production implementations typically use dependency injection
        // to avoid tight coupling between resource classes and core engine systems
        // ...
        return vk::Device(); // Placeholder
    }
};

The helper methods encapsulate the most complex aspects of mesh resource management, hiding implementation details while providing clean interfaces for the core loading and creation logic. The `LoadMeshData` method abstracts the intricacies of different mesh file formats and parsing libraries, enabling the resource system to support multiple formats through a consistent interface.

The buffer creation methods represent some of the most performance-critical code in the mesh resource system, as inefficient GPU memory management can significantly impact rendering performance. Production implementations typically use staging buffers for data upload, implement memory pooling to reduce allocation overhead, and carefully select memory types based on GPU architecture characteristics.

The device access pattern illustrates a common architectural challenge in resource management systems: balancing convenience with loose coupling. While direct access to global singletons can simplify implementation, production systems typically use dependency injection or service locator patterns to maintain testability and flexibility while providing access to core engine services.

The Shader resource represents the programmable stages of the graphics pipeline, managing compilation, loading, and runtime management of shader programs.
This implementation demonstrates how to handle SPIR-V shader modules while providing clean interfaces for shader stage management and hot reloading support during development.

// Shader resource
class Shader : public Resource {
private:
    vk::ShaderModule shaderModule;
    vk::ShaderStageFlagBits stage;

public:
    Shader(const std::string& id, vk::ShaderStageFlagBits shaderStage)
        : Resource(id), stage(shaderStage) {}

    ~Shader() override {
        Unload();
    }

    bool Load() override {
        // Determine file extension based on shader stage
        std::string extension;
        switch (stage) {
            case vk::ShaderStageFlagBits::eVertex: extension = ".vert"; break;
            case vk::ShaderStageFlagBits::eFragment: extension = ".frag"; break;
            case vk::ShaderStageFlagBits::eCompute: extension = ".comp"; break;
            default: return false;
        }

        // Load shader from file
        std::string filePath = "shaders/" + GetId() + extension + ".spv";

        // Read shader code
        std::vector shaderCode;
        if (!ReadFile(filePath, shaderCode)) {
            return false;
        }

        // Create shader module
        CreateShaderModule(shaderCode);

        return Resource::Load();
    }

    void Unload() override {
        // Destroy Vulkan resources
        if (IsLoaded()) {
            // Get device from somewhere (e.g., singleton or parameter)
            vk::Device device = GetDevice();

            device.destroyShaderModule(shaderModule);

            Resource::Unload();
        }
    }

    // Getters for Vulkan resources
    vk::ShaderModule GetShaderModule() const { return shaderModule; }
    vk::ShaderStageFlagBits GetStage() const { return stage; }

private:
    bool ReadFile(const std::string& filePath, std::vector& buffer) {
        // Implementation to read binary file
        // ...
        return true; // Placeholder
    }

    void CreateShaderModule(const std::vector& code) {
        // Implementation to create Vulkan shader module
        // ...
    }

    vk::Device GetDevice() {
        // Get device from somewhere (e.g., singleton or parameter)
        // ...
        return vk::Device(); // Placeholder
    }
};

Here’s how you might use the resource manager in your application:

// Create resource manager
ResourceManager resourceManager;

// Load resources
auto texture = resourceManager.Load("brick");
auto mesh = resourceManager.Load("cube");
auto vertexShader = resourceManager.Load("basic", vk::ShaderStageFlagBits::eVertex);
auto fragmentShader = resourceManager.Load("basic", vk::ShaderStageFlagBits::eFragment);

// Use resources
if (texture && mesh && vertexShader && fragmentShader) {
    // Create material using shaders
    Material material(vertexShader, fragmentShader);

    // Set texture in material
    material.SetTexture("diffuse", texture);

    // Create entity with mesh and material
    Entity entity("MyEntity");
    auto meshComponent = entity.AddComponent(mesh.Get(), &material);
}

// Resources will be automatically released when handles go out of scope
// or you can explicitly release them
resourceManager.Release(texture.GetId());

For large resources, it’s often beneficial to load them asynchronously to avoid blocking the main thread:

class AsyncResourceManager {
private:
    ResourceManager resourceManager;
    std::thread workerThread;
    std::queue> taskQueue;
    std::mutex queueMutex;
    std::condition_variable condition;
    bool running = false;

public:
    AsyncResourceManager() {
        Start();
    }

    ~AsyncResourceManager() {
        Stop();
    }

    void Start() {
        running = true;
        workerThread = std::thread([this]() {
            WorkerThread();
        });
    }

    void Stop() {
        {
            std::lock_guard lock(queueMutex);
            running = false;
        }
        condition.notify_one();
        if (workerThread.joinable()) {
            workerThread.join();
        }
    }

    template
    void LoadAsync(const std::string& resourceId, std::function)> callback) {
        std::lock_guard lock(queueMutex);
        taskQueue.push([this, resourceId, callback]() {
            auto handle = resourceManager.Load(resourceId);
            callback(handle);
        });
        condition.notify_one();
    }

private:
    void WorkerThread() {
        while (running) {
            std::function task;
            {
                std::unique_lock lock(queueMutex);
                condition.wait(lock, [this]() {
                    return !taskQueue.empty() || !running;
                });

                if (!running && taskQueue.empty()) {
                    return;
                }

                task = std::move(taskQueue.front());
                taskQueue.pop();
            }

            task();
        }
    }
};

// Usage example
AsyncResourceManager asyncResourceManager;

asyncResourceManager.LoadAsync("large_texture", [](ResourceHandle texture) {
    // This callback will be called when the texture is loaded
    if (texture) {
        std::cout 

For very large resources like high-resolution textures or detailed meshes, you might want to implement streaming:

**Level of Detail (LOD)** - Load lower-resolution versions first, then progressively load higher-resolution versions.

**Texture Streaming** - Load mipmap levels progressively, starting with the smallest.

**Mesh Streaming** - Load simplified versions of meshes first, then add detail.

During development, it’s useful to be able to update resources without restarting the application:

class HotReloadResourceManager : public ResourceManager {
private:
    std::unordered_map fileTimestamps;
    std::thread watcherThread;
    bool running = false;

public:
    HotReloadResourceManager() {
        StartWatcher();
    }

    ~HotReloadResourceManager() {
        StopWatcher();
    }

    void StartWatcher() {
        running = true;
        watcherThread = std::thread([this]() {
            WatcherThread();
        });
    }

    void StopWatcher() {
        running = false;
        if (watcherThread.joinable()) {
            watcherThread.join();
        }
    }

    template
    ResourceHandle Load(const std::string& resourceId) {
        auto handle = ResourceManager::Load(resourceId);

        // Store file timestamp
        std::string filePath = GetFilePath(resourceId);
        try {
            fileTimestamps[filePath] = std::filesystem::last_write_time(filePath);
        } catch (const std::filesystem::filesystem_error& e) {
            // File doesn't exist or can't be accessed
        }

        return handle;
    }

private:
    template
    std::string GetFilePath(const std::string& resourceId) {
        // Determine file path based on resource type and ID
        if constexpr (std::is_same_v) {
            return "textures/" + resourceId + ".ktx";
        } else if constexpr (std::is_same_v) {
            return "models/" + resourceId + ".gltf";
        } else if constexpr (std::is_same_v) {
            // Simplified for example
            return "shaders/" + resourceId + ".spv";
        } else {
            return "";
        }
    }

    void WatcherThread() {
        while (running) {
            // Check for file changes
            for (auto& [filePath, timestamp] : fileTimestamps) {
                try {
                    auto currentTimestamp = std::filesystem::last_write_time(filePath);
                    if (currentTimestamp != timestamp) {
                        // File has changed, reload resource
                        ReloadResource(filePath);
                        timestamp = currentTimestamp;
                    }
                } catch (const std::filesystem::filesystem_error& e) {
                    // File doesn't exist or can't be accessed
                }
            }

            // Sleep to avoid high CPU usage
            std::this_thread::sleep_for(std::chrono::seconds(1));
        }
    }

    void ReloadResource(const std::string& filePath) {
        // Extract resource ID and type from file path
        // Reload the resource
        // ...
    }
};

A well-designed resource management system is crucial for efficiently handling assets in your rendering engine. By implementing the techniques described in this section, you can create a system that:

Efficiently loads and unloads resources

Prevents redundant loading through caching

Manages memory usage through reference counting

Supports asynchronous loading for better performance

Enables hot reloading for faster development

In the next section, we’ll explore rendering pipeline design, which will build upon the resource management system to create a flexible and efficient rendering system.

[Previous: Component Systems](03_component_systems.html) | [Next: Rendering Pipeline](05_rendering_pipeline.html)
