import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ImageUploaderProps {
  onUpload: (url: string) => void;
  currentImage?: string;
  multiple?: boolean;
  onMultipleUpload?: (urls: string[]) => void;
  maxFiles?: number;
}

export function ImageUploader({ 
  onUpload, 
  currentImage, 
  multiple = false, 
  onMultipleUpload,
  maxFiles = 5 
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [previewUrls, setPreviewUrls] = useState<string[]>(currentImage ? [currentImage] : []);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const uploadToSupabase = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("uploads")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false
        });

      if (uploadError) {
        console.error("Upload error:", uploadError);
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from("uploads")
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error("Error in uploadToSupabase:", error);
      return null;
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);

    try {
      if (multiple && onMultipleUpload) {
        const urls: string[] = [];
        const filesToUpload = Array.from(files).slice(0, maxFiles);
        
        for (const file of filesToUpload) {
          if (!file.type.startsWith("image/")) {
            toast({
              title: "Erreur",
              description: "Veuillez sélectionner uniquement des images",
              variant: "destructive",
            });
            continue;
          }

          const url = await uploadToSupabase(file);
          if (url) {
            urls.push(url);
          }
        }

        if (urls.length > 0) {
          setPreviewUrls(urls);
          onMultipleUpload(urls);
          toast({
            title: "Succès",
            description: `${urls.length} image(s) uploadée(s) avec succès`,
          });
        }
      } else {
        const file = files[0];
        
        if (!file.type.startsWith("image/")) {
          toast({
            title: "Erreur",
            description: "Veuillez sélectionner une image",
            variant: "destructive",
          });
          return;
        }

        const url = await uploadToSupabase(file);
        
        if (url) {
          setPreviewUrls([url]);
          onUpload(url);
          toast({
            title: "Succès",
            description: "Image uploadée avec succès",
          });
        } else {
          toast({
            title: "Erreur",
            description: "Erreur lors de l'upload de l'image",
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Erreur",
        description: "Erreur lors de l'upload des images",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const removeImage = (index: number) => {
    const newUrls = previewUrls.filter((_, i) => i !== index);
    setPreviewUrls(newUrls);
    if (multiple && onMultipleUpload) {
      onMultipleUpload(newUrls);
    } else if (newUrls.length === 0) {
      onUpload("");
    }
  };

  return (
    <div className="space-y-4">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple={multiple}
        onChange={handleFileChange}
        className="hidden"
      />
      
      <Button
        type="button"
        variant="outline"
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
        className="w-full"
      >
        <Upload className="w-4 h-4 mr-2" />
        {uploading ? "Upload en cours..." : multiple ? "Sélectionner des images" : "Sélectionner une image"}
      </Button>

      {previewUrls.length > 0 && (
        <div className={`grid ${multiple ? "grid-cols-2 md:grid-cols-3" : "grid-cols-1"} gap-4`}>
          {previewUrls.map((url, index) => (
            <div key={index} className="relative group">
              <div className="aspect-video relative rounded-lg overflow-hidden border-2 border-border">
                <img
                  src={url}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeImage(index)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              {multiple && (
                <p className="text-xs text-center text-muted-foreground mt-1">
                  Image {index + 1}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {multiple && (
        <p className="text-xs text-muted-foreground">
          Maximum {maxFiles} images. Les images seront affichées dans un slider sur l'article.
        </p>
      )}
    </div>
  );
}